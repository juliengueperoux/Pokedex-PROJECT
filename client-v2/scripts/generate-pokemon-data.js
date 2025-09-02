const https = require('https');
const fs = require('fs');
const path = require('path');

const dest = path.join(__dirname, '..', 'public', 'pokemon-data.json');

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function main() {
  console.log('Fetching all pokemon...');
  const pokemonList = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
  const pokemons = [];
  const typeCache = new Map();
  const abilityCache = new Map();

  for (const p of pokemonList.results) {
    console.log(`Fetching details for ${p.name}...`);
    const pokemon = await fetch(p.url);
    const species = await fetch(pokemon.species.url);

    const nameEn = p.name;
    let nameFr = species.names.find(n => n.language.name === 'fr')?.name || nameEn;

    // Check if the English name has a suffix compared to the base species name
    const baseSpeciesNameEn = species.name;
    if (nameEn !== baseSpeciesNameEn) {
      // Find the suffix by removing the base species name from the English name
      const suffix = nameEn.substring(baseSpeciesNameEn.length);
      // Append the suffix to the French name
      nameFr = `${nameFr}${suffix}`;
    }

    const types = [];
    for (const typeInfo of pokemon.types) {
      let typeDetails;
      if (typeCache.has(typeInfo.type.name)) {
        typeDetails = typeCache.get(typeInfo.type.name);
      } else {
        console.log(`Fetching type ${typeInfo.type.name}...`);
        typeDetails = await fetch(typeInfo.type.url);
        typeCache.set(typeInfo.type.name, typeDetails);
      }
      
      const typeNameFr = typeDetails.names.find(n => n.language.name === 'fr')?.name || typeInfo.type.name;
      types.push({
        slot: typeInfo.slot,
        type: {
          name: typeInfo.type.name,
          name_fr: typeNameFr,
        }
      });
    }

    const abilities = [];
    for (const abilityInfo of pokemon.abilities) {
      let abilityDetails;
      if (abilityCache.has(abilityInfo.ability.name)) {
        abilityDetails = abilityCache.get(abilityInfo.ability.name);
      } else {
        console.log(`Fetching ability ${abilityInfo.ability.name}...`);
        abilityDetails = await fetch(abilityInfo.ability.url);
        abilityCache.set(abilityInfo.ability.name, abilityDetails);
      }
      
      const abilityNameFr = abilityDetails.names.find(n => n.language.name === 'fr')?.name || abilityInfo.ability.name;
      abilities.push({
        is_hidden: abilityInfo.is_hidden,
        slot: abilityInfo.slot,
        ability: {
          name: abilityInfo.ability.name,
          name_fr: abilityNameFr,
          url: abilityInfo.ability.url
        }
      });
    }

    const description = species.flavor_text_entries.find(entry => entry.language.name === 'fr')?.flavor_text || '';

    const sprites = {};
    for (const key in pokemon.sprites) {
      if (typeof pokemon.sprites[key] === 'string' && key.includes("default")) {
        sprites[key] = pokemon.sprites[key];
      }
    }

    pokemons.push({
      id: pokemon.id,
      name: nameFr,
      name_en: nameEn,
      description,
      sprites,
      types,
      abilities
    });
  }

  fs.writeFileSync(dest, JSON.stringify(pokemons, null, 2));
  console.log('Generated pokemon data to', dest);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});