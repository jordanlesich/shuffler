import { Card } from './types';

export const getCardOfType = (cardId: string, deck: Card[]) => {
  return deck.filter((card) => card.id === cardId);
};
export const shuffle = <T>(array: T[]): T[] => {
  const shuffledArray = array.slice(); // Create a shallow copy to avoid modifying the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Swap the elements at indices i and randomIndex
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
};
