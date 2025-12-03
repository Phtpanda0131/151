import { Card } from './types';

export const POKEMON_151_NAMES = [
  "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
  "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
  "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
  "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
  "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina",
  "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable",
  "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat",
  "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat",
  "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck",
  "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
  "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
  "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
  "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash",
  "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo",
  "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster",
  "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno",
  "Krabby", "Kingler", "Voltorb", "Electrodes", "Exeggcute", "Exeggutor",
  "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing",
  "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
  "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie",
  "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir",
  "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee",
  "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar",
  "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos",
  "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
];

const TRAINER_NAMES_152_165 = [
  "Antique Dome Fossil",
  "Antique Helix Fossil",
  "Antique Old Amber",
  "Big Air Balloon",
  "Bill's Transfer",
  "Cycling Road",
  "Daisy's Help",
  "Energy Sticker",
  "Erika's Invitation",
  "Giovanni's Charisma",
  "Grabber",
  "Leftovers",
  "Protective Goggles",
  "Rigid Band"
];

const SECRET_RARES = [
  { number: 166, name: "Bulbasaur", rarity: "Illustration Rare" },
  { number: 167, name: "Ivysaur", rarity: "Illustration Rare" },
  { number: 168, name: "Charmander", rarity: "Illustration Rare" },
  { number: 169, name: "Charmeleon", rarity: "Illustration Rare" },
  { number: 170, name: "Squirtle", rarity: "Illustration Rare" },
  { number: 171, name: "Wartortle", rarity: "Illustration Rare" },
  { number: 172, name: "Caterpie", rarity: "Illustration Rare" },
  { number: 173, name: "Pikachu", rarity: "Illustration Rare" },
  { number: 174, name: "Nidoking", rarity: "Illustration Rare" },
  { number: 175, name: "Psyduck", rarity: "Illustration Rare" },
  { number: 176, name: "Poliwhirl", rarity: "Illustration Rare" },
  { number: 177, name: "Machoke", rarity: "Illustration Rare" },
  { number: 178, name: "Tangela", rarity: "Illustration Rare" },
  { number: 179, name: "Mr. Mime", rarity: "Illustration Rare" },
  { number: 180, name: "Omanyte", rarity: "Illustration Rare" },
  { number: 181, name: "Dragonair", rarity: "Illustration Rare" },
  { number: 182, name: "Venusaur ex", rarity: "Ultra Rare" },
  { number: 183, name: "Charizard ex", rarity: "Ultra Rare" },
  { number: 184, name: "Blastoise ex", rarity: "Ultra Rare" },
  { number: 185, name: "Arbok ex", rarity: "Ultra Rare" },
  { number: 186, name: "Ninetales ex", rarity: "Ultra Rare" },
  { number: 187, name: "Wigglytuff ex", rarity: "Ultra Rare" },
  { number: 188, name: "Alakazam ex", rarity: "Ultra Rare" },
  { number: 189, name: "Golem ex", rarity: "Ultra Rare" },
  { number: 190, name: "Kangaskhan ex", rarity: "Ultra Rare" },
  { number: 191, name: "Jynx ex", rarity: "Ultra Rare" },
  { number: 192, name: "Zapdos ex", rarity: "Ultra Rare" },
  { number: 193, name: "Mew ex", rarity: "Ultra Rare" },
  { number: 194, name: "Bill's Transfer", rarity: "Ultra Rare" },
  { number: 195, name: "Daisy's Help", rarity: "Ultra Rare" },
  { number: 196, name: "Erika's Invitation", rarity: "Ultra Rare" },
  { number: 197, name: "Giovanni's Charisma", rarity: "Ultra Rare" },
  { number: 198, name: "Venusaur ex", rarity: "Special Illustration Rare" },
  { number: 199, name: "Charizard ex", rarity: "Special Illustration Rare" },
  { number: 200, name: "Blastoise ex", rarity: "Special Illustration Rare" },
  { number: 201, name: "Alakazam ex", rarity: "Special Illustration Rare" },
  { number: 202, name: "Zapdos ex", rarity: "Special Illustration Rare" },
  { number: 203, name: "Erika's Invitation", rarity: "Special Illustration Rare" },
  { number: 204, name: "Giovanni's Charisma", rarity: "Special Illustration Rare" },
  { number: 205, name: "Mew ex", rarity: "Hyper Rare" },
  { number: 206, name: "Switch", rarity: "Hyper Rare" },
  { number: 207, name: "Basic Psychic Energy", rarity: "Hyper Rare" },
];

const SET_CODE = 'sv3pt5';

const MAIN_SET: Card[] = Array.from({ length: 165 }, (_, i) => {
  const number = i + 1;
  const isPokemon = number <= 151;
  
  let name = "";
  if (isPokemon) {
    name = POKEMON_151_NAMES[i];
  } else {
    // 152 is index 0 in TRAINER_NAMES array
    name = TRAINER_NAMES_152_165[number - 152];
  }

  return {
    id: `${SET_CODE}-${number}`,
    number: number,
    name: name,
    imageUrl: `https://images.pokemontcg.io/${SET_CODE}/${number}_hires.png`,
    rarity: isPokemon ? 'Common/Rare' : 'Uncommon',
    supertype: isPokemon ? 'Pokémon' : 'Trainer'
  };
});

const SECRET_RARE_CARDS: Card[] = SECRET_RARES.map(src => ({
  id: `${SET_CODE}-${src.number}`,
  number: src.number,
  name: src.name,
  imageUrl: `https://images.pokemontcg.io/${SET_CODE}/${src.number}_hires.png`,
  rarity: src.rarity,
  supertype: src.rarity.includes('Energy') ? 'Energy' : (src.rarity.includes('Switch') || src.rarity.includes('Bill') || src.rarity.includes('Daisy') || src.rarity.includes('Erika') || src.rarity.includes('Giovanni') ? 'Trainer' : 'Pokémon')
}));

export const FULL_CARD_LIST: Card[] = [...MAIN_SET, ...SECRET_RARE_CARDS];
