export enum CType {
  Unknown = 'unknown',
  Creature = 'creature',
  Mob = 'mob',
  Construct = 'construct',
  Spell = 'spell',
  Ritual = 'ritual',
  Hero = 'hero',
  Blessing = 'blessing',
}
export enum CultTypes {
  'Any' = 'any',
  'Ducks' = 'The Quacks',
  'Shrooms' = 'The Cleansing',
  'Regs' = 'The Regulators',
}

export type Card = {
  id: string;
  type: CType;
  deckId?: string;
  title: string;
  nrg: number;
  cult: CultTypes;
  actions: string[];
  //  creature specific
  health?: number;
  attack?: number;
  defend?: number;
  onSacrifice?: string;
  description?: string;
  imgUrl?: string;
};

export type Deck = {
  id: string;
  name: string;
  cards: Card[];
};
