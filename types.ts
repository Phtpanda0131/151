export interface Card {
  id: string;
  name: string;
  number: number;
  imageUrl: string;
  rarity: string;
  supertype: 'Pokémon' | 'Trainer' | 'Energy';
}

export interface CollectionState {
  [cardId: string]: boolean; // true if collected
}

export enum FilterType {
  ALL = 'ALL',
  COLLECTED = 'COLLECTED',
  MISSING = 'MISSING',
}

export interface PriceData {
  text: string;
  sources: {
    title?: string;
    uri: string;
  }[];
}