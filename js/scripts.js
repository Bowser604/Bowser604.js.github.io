let pokemonList = [{
    name: 'Charizard', height: 1.7, types: ['Fire'], 
    abilities: ['blaze', 'solar-power']
},
{
    name: 'Pikachu', height: 0.4, types: ['Electric'], 
    abilities: ['static', 'lighting-rod']
},
{
    name: 'Abra', height: 0.9, types: ['Psychic'], 
    abilities: ['synchronize', 'inner-focus']
}
];

pokemonList.forEach((pokemon) => {
  if (pokemon.height > 1) {
    document.write(
        ${pokemon.name} (height: ${pokemon.height}) - Wow. Thants Big!<br>
    );
  } else {
    document.write($pokemon.name} (height; ${pokemon.height})<br>);
  }
});
