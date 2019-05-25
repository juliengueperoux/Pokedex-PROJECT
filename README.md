# ESIR-IHM-PROJECT

## Introduction

Ce projet a pour finalité de permettre à un utilisateur de trouver un pokémon, créer ses propres pokémons et pouvoir consulter tous les pokémons disponibles depuis la base de données PokéApi.
Pour ce faire, différentes vues ont été crées.

## Partie 1 : Recherche de Pokémon

Le sujet mentionnait l'utilisation d'un input et d'un select pour filter les pokemons. Cependant, l'utilisation d'un input de type "autocomplete" m'a paru être plus pertinant. L'utilisation d'un filtre est indispensable dans les deux cas, la consigne du sujet est donc toujours respectée. Le filtre est mis sur les noms des pokémons mais également sur les identifiants. Cela permet de n'avoir qu'une seule input pour d'une part chercher par l'id du pokémon mais également par son nom.

Afin d'afficher le pokemon selectionné, j'ai créé un composant que j'utilise à différents endroits de l'application.
Il rassemble les informations principales du pokémon séléctionné.

Afin d'actualiser ce composant à chaque recherche, j'ai mis en place un service et y est ajouté une variable en tant qu'observable.
Une souscritpion à cette variable permet de savoir quand celle-ci a changé dans le service depuis le composant.

## Partie 2 : Création d'un Pokémon

Afin de permettre à tous les utilisateurs de créer leurs propres pokémons, un section de l'application y est consacrée.
Elle contient un formulaire permettant de renseigner tous les paramètres d'un pokémon.
Du nom en pasant par les capacités et une image, tout peut être renseigné.

Une fois le formulaire validé, je réutilise le composant de visualisation du pokémon. L'utilisateur peut ensuite enregister sa carte de pokémon en tant qu'image au format .png et la partager à ses amis !

## Partie 3 : Liste des Pokémons

Pour permettre aux utilisateurs de visualiser tous les pokémons, j'ai mis en place un section rassemblant tous les pokémons. L'utilisateur charges les pokemons 20 par 20 en cliquant sur le bouton "Load More" en bas de page.
Afin de ne pas avoir à réaliser de tri des données (les requêtes Http étant asynchrones), j'ai utilisé un opérateur de la libraire RxJS nommé "forkJoin" et permettant de faire des requêtes Http en parallèles.

Lorsque l'utilisateur clique sur un pokémon, cela ouvre une dialogue contenant la visualtion des détails du pokémon.

## Conclusion

Ce projet rassemble de nombreux aspects de la réalisation d'une IHM en Angular. Routing, services, composants génériques, binding sont de nombreux aspects abordés dans ce Projet.

