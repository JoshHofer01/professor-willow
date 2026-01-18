export interface GameEvent {
  eventID: string;
  name: string;
  eventType: string;
  heading: string;
  link: string;
  image: string;
  start: string;
  end: string;
  status?: "live" | "upcoming" | "completed";
}

export interface PokemonDataMin {
  dexNr: number;
  generation: number;
  name: string,
  primaryType: string;
  secondaryType?: string | null;
  image?: string | null;
}

export interface PokemonData {
  id: string;
  formId?: string;
  dexNr: number;
  generation: number;
  names: LocalizedNames;
  stats: Stats;
  primaryType: PokemonType;
  secondaryType?: PokemonType | null;
  pokemonClass?: string;
  quickMoves: Record<string, Move>;
  cinematicMoves: Record<string, Move>;
  eliteQuickMoves: Record<string, Move>;
  eliteCinematicMoves: Record<string, Move>;
  assets: Assets;
  assetForms: AssetForm[];
  regionForms?: Record<string, PokemonData>;
  evolutions?: Evolution[];
  hasMegaEvolution?: boolean;
  megaEvolutions?: Record<string, MegaEvolution>;
}

/* Supporting / reusable types */
export interface LocalizedNames {
  English: string;
  German?: string;
  French?: string;
  Italian?: string;
  Japanese?: string;
  Korean?: string;
  Spanish?: string;
}

export interface Stats {
  stamina: number;
  attack: number;
  defense: number;
}

export interface PokemonType {
  type: string;
  names: LocalizedNames;
}

export interface MoveBuffs {
  activationChance: number;
  attackerAttackStatsChange: number;
  attackerDefenseStatsChange: number;
  targetAttackStatsChange: number;
  targetDefenseStatsChange: number;
}

export interface MoveCombat {
  energy: number;
  power: number;
  turns: number;
  buffs: MoveBuffs;
}

export interface Move {
  id: string;
  power: number;
  energy: number;
  durationMs: number;
  type: PokemonType;
  names: LocalizedNames;
  combat: MoveCombat;
}

export interface Assets {
  image: string;
  shinyImage: string;
}

export interface AssetForm {
  image: string;
  shinyImage: string;
  form: string;
  costume?: string;
  isFemale?: boolean;
}

export interface EvolutionItem {
  id: string;
  names: LocalizedNames;
}

export interface EvolutionQuest {
  id: string;
  type: string;
  names: LocalizedNames;
}

export interface Evolution {
  id: string;
  formId?: string;
  candies?: number;
  item?: EvolutionItem;
  quests?: EvolutionQuest[];
}

export interface MegaEvolution {
  id: string;
  names: LocalizedNames;
  stats: Stats;
  primaryType: PokemonType;
  secondaryType?: PokemonType | null;
  assets: Assets;
}

export interface BattleResult {
  name: string;
  friendshipLevel: number;
  pokemonLevel: number;
  totalEstimator: number;
}

export interface BattleResults {
  easy: BattleResult;
  normal: BattleResult;
  hard: BattleResult;
}

export interface RaidPokemon {
  id: string;
  form: string;
  costume: string;
  assets: Assets;
  level: string;
  shiny: boolean;
  types: string[];
  counter: Record<string, number>;
  weather: string[];
  cpRange: [number, number];
  cpRangeBoost: [number, number];
  names: LocalizedNames;
  battleResult: BattleResults;
}

export interface RaidList {
  lvl1: RaidPokemon[];
  lvl3: RaidPokemon[];
  lvl5: RaidPokemon[];
  mega: RaidPokemon[];
  ultra_beast: RaidPokemon[];
  legendary_mega: RaidPokemon[];
  ex: RaidPokemon[];
  shadow_lvl5: RaidPokemon[];
  shadow_lvl3: RaidPokemon[];
  shadow_lvl1: RaidPokemon[];
}

export interface Raid {
  currentList: RaidList;
}