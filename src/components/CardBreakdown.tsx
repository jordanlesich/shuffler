import React from 'react';
import { getCardOfType } from '../utils/cardUtils';
import { Card, Deck } from '../utils/types';
import { ParMd, ParSm } from './typography';

export const CardBreakdown = ({
  allCards,
  currentDeck,
}: {
  allCards: Card[];
  currentDeck: Deck;
}) => {
  return (
    <div className="mb-sm">
      <ParMd className="mb-sm">Cards: </ParMd>
      {allCards.map((card) => {
        const numCardsInDeck = getCardOfType(card.id, currentDeck.cards).length;
        if (numCardsInDeck) {
          return (
            <ParSm key={card.id}>
              <>
                {card.title} x{' '}
                {getCardOfType(card.id, currentDeck.cards).length}
              </>
            </ParSm>
          );
        }
        return null;
      })}
    </div>
  );
};
