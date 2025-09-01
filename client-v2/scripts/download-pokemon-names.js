const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = {
  fr: 'https://raw.githubusercontent.com/sindresorhus/pokemon/main/data/fr.json',
  en: 'https://raw.githubusercontent.com/sindresorhus/pokemon/main/data/en.json',
};

const destDir = path.join(__dirname, '..', 'src', 'assets');
const dest = path.join(destDir, 'pokemon-names.json');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const download = (url) => {
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

Promise.all([download(urls.fr), download(urls.en)])
  .then(([fr, en]) => {
    const data = fr.map((name, index) => ({
      fr: name,
      en: en[index],
    }));

    fs.writeFile(dest, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Downloaded pokemon names to', dest);
      }
    });
  })
  .catch((err) => {
    console.error('Error downloading pokemon names:', err.message);
  });