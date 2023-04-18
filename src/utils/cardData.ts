import { Card, CType, CultTypes } from './types';

const Strike = {
  id: '03a6409b-f973-409d-a2a9-22741f3d472f',
  title: 'Strike',
  type: CType.Spell,
  cult: CultTypes.Any,
  nrg: 1,
  alignment: 'test',
  actions: ['Deal 6 damage'],
};
const Defend = {
  id: '86de440c-5e60-49ad-b21c-aafc9bcdbf67',
  title: 'Defend',
  type: CType.Spell,
  cult: CultTypes.Any,
  nrg: 1,
  alignment: 'test',
  actions: ['Gain 5 block'],
};
const Bash = {
  id: 'b0327fdd-ba4b-4ae3-a607-3bc89490a7c4',
  type: CType.Spell,
  title: 'Bash',
  cult: CultTypes.Any,
  nrg: 2,
  alignment: 'test',
  actions: ['Deal 7 damage'],
};
const CuckDuck = {
  id: '0e2db7c9-3239-4f1d-a138-4b6a162eb466',
  title: 'CuckDuck',
  type: CType.Creature,
  cult: CultTypes.Ducks,
  nrg: 1,
  alignment: 'test',
  actions: [],
  attack: 2,
  health: 7,
  defend: 0,
};
const MoNRG = {
  id: '13100102-7151-47d5-93bd-58c80cb3b0e9',
  title: 'Mo NRG',
  type: CType.Construct,
  cult: CultTypes.Any,
  nrg: 3,
  alignment: 'test',
  actions: ['Add 1 NRG each turn'],
  health: 14,
};
const LoverBoy = {
  id: 'e134bcbc-f496-4d0e-9431-1ce9176d9894',
  title: 'Lover Boy',
  type: CType.Creature,
  nrg: 2,
  cult: CultTypes.Regs,
  alignment: 'test',
  actions: ["Heal MC's health by 4 each turn"],
  attack: 0,
  defend: 0,
  health: 10,
};

export const startingCards: Card[] = [
  Strike,
  Defend,
  Bash,
  CuckDuck,
  MoNRG,
  LoverBoy,
];
