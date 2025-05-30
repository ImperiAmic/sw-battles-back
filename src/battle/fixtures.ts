import { BattleData, BattleStructure } from "./types.js";

export const empuriesBattle: BattleStructure = {
  _id: "111aaa111aaa111aaa111aaa",
  battleName: "Battle of Empúries",
  conflict: "Second Punic War",
  year: 218,
  period: "BBY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/3/38/Empúries_Ruins.jpg",
  description:
    "Roman general Gnaeus Scipio landed at Empúries to confront the Carthaginian presence in Iberia. The victory laid the foundation for Roman influence in the region that would become Catalonia.",
  lightSide: ["Roman Republic"],
  darkSide: ["Carthaginian Empire"],
  doesLightSideWin: true,
};

export const ruscinoBattle: BattleStructure = {
  _id: "222bbb222bbb222bbb222bbb",
  battleName: "Battle of Ruscino",
  conflict: "Gallic Invasions",
  year: 121,
  period: "BBY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Gallia_Narbonensis.png",
  description:
    "Fought near present-day Roussillon, the Romans defeated the Gallic tribes and reinforced their dominance in southeastern Gaul, impacting Catalonia’s northern border.",
  lightSide: ["Roman Republic"],
  darkSide: ["Gallic Tribes"],
  doesLightSideWin: true,
};

export const ilipaBattle: BattleStructure = {
  _id: "333ccc333ccc333ccc333ccc",
  battleName: "Battle of Ilipa",
  conflict: "Second Punic War",
  year: 206,
  period: "BBY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Battle_of_Ilipa.png",
  description:
    "One of Rome's most decisive victories over Carthage in Iberia, this battle helped secure Roman control over the territory, including Catalonia.",
  lightSide: ["Roman Republic"],
  darkSide: ["Carthaginian Empire"],
  doesLightSideWin: true,
};

export const martorellBattle: BattleStructure = {
  _id: "444ddd444ddd444ddd444ddd",
  battleName: "Battle of Martorell",
  conflict: "Catalan Revolt",
  year: 1641,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/6/6e/Batalla_de_Martorell.jpg",
  description:
    "As part of the Reapers' War, Catalan and French forces tried to defend against a Spanish advance. Though they delayed Spanish forces, Martorell ultimately fell.",
  lightSide: ["Catalan Republic", "Kingdom of France"],
  darkSide: ["Spanish Monarchy"],
  doesLightSideWin: false,
};

export const montjuicBattle: BattleStructure = {
  _id: "555eee555eee555eee555eee",
  battleName: "Battle of Montjuïc",
  conflict: "Catalan Revolt",
  year: 1641,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/Battle_of_Montjuic_1641.jpg",
  description:
    "Only days after Martorell, Catalan and French forces successfully repelled the Spanish army at Montjuïc hill near Barcelona, preserving the city’s independence.",
  lightSide: ["Catalan Republic", "Kingdom of France"],
  darkSide: ["Spanish Monarchy"],
  doesLightSideWin: true,
};

export const lleidaBattle: BattleStructure = {
  _id: "666fff666fff666fff666fff",
  battleName: "Battle of Lleida",
  conflict: "Catalan Revolt",
  year: 1644,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/6/64/Catedral_Lleida.JPG",
  description:
    "Spanish royal forces recaptured Lleida from Catalan and French defenders after a prolonged siege, dealing a blow to the Catalan resistance during the Reapers' War.",
  lightSide: ["Catalan Republic", "Kingdom of France"],
  darkSide: ["Spanish Monarchy"],
  doesLightSideWin: false,
};

export const barcelonaBattle: BattleStructure = {
  _id: "aaa111aaa111aaa111aaa111",
  battleName: "Battle of Barcelona",
  conflict: "War of the Spanish Succession",
  year: 1714,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/e/e6/1714_-_Setge_de_Barcelona.jpg",
  description:
    "After a 14-month siege, Bourbon forces captured Barcelona, ending Catalan resistance and leading to the suppression of Catalan institutions and laws.",
  lightSide: ["Principality of Catalonia", "Habsburg loyalists"],
  darkSide: ["Bourbon Spain"],
  doesLightSideWin: false,
};

export const rosesBattle: BattleStructure = {
  _id: "bbb222bbb222bbb222bbb222",
  battleName: "Siege of Roses",
  conflict: "War of the Pyrenees",
  year: 1794,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Siege_of_Roses_1794.jpg",
  description:
    "The French Revolutionary Army besieged and captured Roses, a key strategic port on the Catalan coast, from Spanish forces during the War of the Pyrenees.",
  lightSide: ["French Republic"],
  darkSide: ["Spanish Monarchy"],
  doesLightSideWin: true,
};

export const ebreBattle: BattleStructure = {
  _id: "ccc333ccc333ccc333ccc333",
  battleName: "Battle of the Ebre",
  conflict: "Spanish Civil War",
  year: 1938,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Batalla_del_Ebre.jpg",
  description:
    "The largest and bloodiest battle of the Spanish Civil War, fought largely in Catalonia. Despite initial Republican advances, Franco's forces ultimately prevailed.",
  lightSide: ["Spanish Republic"],
  darkSide: ["Nationalist Spain"],
  doesLightSideWin: false,
};

export const catalanBattles: BattleStructure[] = [
  ebreBattle,
  ruscinoBattle,
  ilipaBattle,
  martorellBattle,
  montjuicBattle,
  lleidaBattle,
  barcelonaBattle,
  rosesBattle,
  empuriesBattle,
];

export const wrongIdEbreBattle: BattleStructure = {
  _id: "ccc333ccc333ccc333ccc",
  battleName: "Battle of the Ebre",
  conflict: "Spanish Civil War",
  year: 1938,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Batalla_del_Ebre.jpg",
  description:
    "The largest and bloodiest battle of the Spanish Civil War, fought largely in Catalonia. Despite initial Republican advances, Franco's forces ultimately prevailed.",
  lightSide: ["Spanish Republic"],
  darkSide: ["Nationalist Spain"],
  doesLightSideWin: false,
};

export const newVilafrancaBattle: BattleData = {
  battleName: "Battle of Vilafranca",
  conflict: "Penedès Wars",
  year: 2025,
  period: "ABY",
  description: "Coses de la vida",
  lightSide: ["Els bons"],
  darkSide: ["Els dolents"],
  doesLightSideWin: false,
};

export const newRosesBattle: BattleData = {
  battleName: "Siege of Roses",
  conflict: "War of the Pyrenees",
  year: 1794,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Siege_of_Roses_1794.jpg",
  description:
    "The French Revolutionary Army besieged and captured Roses, a key strategic port on the Catalan coast, from Spanish forces during the War of the Pyrenees.",
  lightSide: ["French Republic"],
  darkSide: ["Spanish Monarchy"],
  doesLightSideWin: true,
};

export const repeatedRosesBattle: BattleData = {
  battleName: "Siege of Roses",
  conflict: "War of the Pyrenees",
  year: 1794,
  period: "ABY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Siege_of_Roses_1794.jpg",
  description:
    "The French Revolutionary Army besieged and captured Roses, a key strategic port on the Catalan coast, from Spanish forces during the War of the Pyrenees.",
  lightSide: ["French Republic"],
  darkSide: ["Spanish Monarchy"],
  doesLightSideWin: true,
};

export const editedRuscinoBattle: BattleStructure = {
  _id: "222bbb222bbb222bbb222bbb",
  battleName: "Battle of Ruscino",
  conflict: "Gallic North Invasions",
  year: 122,
  period: "BBY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Gallia_Narbonensis.png",
  description:
    "Fought near present-day Roussillon, the Romans defeated the Gallic tribes and reinforced their dominance in southeastern Gaul, impacting Catalonia’s northern border.",
  lightSide: ["Roman Republic"],
  darkSide: ["Gallic Tribes"],
  doesLightSideWin: true,
};

export const editedDuplicatedRuscinoBattle: BattleStructure = {
  _id: "222bbb222bbb222bbb222bbb",
  battleName: "Siege of Roses",
  conflict: "Gallic North Invasions",
  year: 122,
  period: "BBY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Gallia_Narbonensis.png",
  description:
    "Fought near present-day Roussillon, the Romans defeated the Gallic tribes and reinforced their dominance in southeastern Gaul, impacting Catalonia’s northern border.",
  lightSide: ["Roman Republic"],
  darkSide: ["Gallic Tribes"],
  doesLightSideWin: true,
};

export const wrongEditedRuscinoBattle: BattleStructure = {
  _id: "222bbb222bbb222bbb222",
  battleName: "Battle of Ruscino",
  conflict: "Gallic North Invasions",
  year: 122,
  period: "BBY",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Gallia_Narbonensis.png",
  description:
    "Fought near present-day Roussillon, the Romans defeated the Gallic tribes and reinforced their dominance in southeastern Gaul, impacting Catalonia’s northern border.",
  lightSide: ["Roman Republic"],
  darkSide: ["Gallic Tribes"],
  doesLightSideWin: true,
};
