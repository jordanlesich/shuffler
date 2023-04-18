import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button, ButtonPanel } from '../components/Button';
import { Card } from '../components/Card';
import { CardBack } from '../components/CardBack';
import { CardBreakdown } from '../components/CardBreakdown';
import { Select } from '../components/form';
import { H2, H4, ParLg, ParMd, ParSm } from '../components/typography';
import { shuffle } from '../utils/cardUtils';
import { Card as CardType, Deck } from '../utils/types';

type GameManager = {
  drawPile: CardType[];
  discardPile: CardType[];
  hand: CardType[];
  burnPile: CardType[];
  turns: number;
  handDrawAmt: number;

  canDrawHand: boolean;
};

const startingGameManager: GameManager = {
  drawPile: [],
  discardPile: [],
  hand: [],
  burnPile: [],
  turns: 0,
  handDrawAmt: 6,
  canDrawHand: false,
};

type ShufflerProps = {
  decks: Deck[];
  allCards: CardType[];
};

enum PageState {
  ChooseDeck,
  Shuffle,
}

export const Shuffler = ({ decks, allCards }: ShufflerProps) => {
  const [pageState, setPageState] = React.useState<PageState>(
    PageState.ChooseDeck
  );
  const [selectedDeck, setSelectedDeck] = React.useState<Deck | null>(null);
  const [gameManager, setGameManager] =
    React.useState<GameManager>(startingGameManager);

  const [cardSelected, setCardSelected] = React.useState<string | null>(null);

  const handleSelectDeck = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const deckId = event.target.value;
    const deck = decks.find((deck) => deck.id === deckId);
    if (!deck) return;

    setSelectedDeck(deck);
  };

  const startGame = () => {
    if (!selectedDeck) return;
    const drawPile = shuffle(selectedDeck.cards);
    setPageState(PageState.Shuffle);
    setGameManager({
      ...gameManager,
      drawPile,
      canDrawHand: true,
    });
  };

  const drawCard = useCallback(() => {
    setGameManager((prevManager) => {
      if (!prevManager.drawPile.length) {
        const shuffled = shuffle([...prevManager.discardPile]);
        const newCard = shuffled[shuffled.length - 1];
        const newDrawPile = shuffled.slice(0, shuffled.length - 1);

        const newGM = {
          ...prevManager,
          drawPile: newDrawPile,
          discardPile: [],
          hand: [...prevManager.hand, newCard as CardType],
        };
        return newGM;
      } else {
        const newCard = prevManager.drawPile[prevManager.drawPile.length - 1];
        const newDraw = prevManager.drawPile.slice(
          0,
          prevManager.drawPile.length - 1
        );
        return {
          ...prevManager,
          drawPile: newDraw,
          hand: [...prevManager.hand, newCard as CardType],
        };
      }
    });
  }, [gameManager]);

  const finishTurn = () => {
    const newDiscardPile = [...gameManager.discardPile, ...gameManager.hand];
    setGameManager({
      ...gameManager,
      turns: gameManager.turns + 1,
      hand: [],
      discardPile: newDiscardPile,
      canDrawHand: true,
    });
  };

  // const drawSingleCard = drawCard();

  const drawHand = useCallback(() => {
    if (!gameManager.handDrawAmt) return;

    let count = 0;

    const initialAmt = setInterval(() => {
      if (count === gameManager.handDrawAmt) {
        clearInterval(initialAmt);
        return;
      }
      drawCard();
      count++;
    }, 100);

    setGameManager({
      ...gameManager,
      canDrawHand: false,
    });
  }, [gameManager, drawCard]);

  const selectCard = (card: CardType) => {
    if (!card.deckId) {
      return;
    }
    if (cardSelected === card.deckId) {
      setCardSelected(null);
      return;
    }

    setCardSelected(card.deckId);
  };

  const playCard = (card: CardType) => {
    if (!card.deckId) {
      return;
    }
    const newHand = gameManager.hand.filter((c) => c.deckId !== card.deckId);

    setGameManager({
      ...gameManager,
      hand: newHand,
      discardPile: [...gameManager.discardPile, card],
    });
  };

  const burnCard = (card: CardType) => {
    if (!card.deckId) {
      return;
    }
    const newHand = gameManager.hand.filter((c) => c.deckId !== card.deckId);

    setGameManager({
      ...gameManager,
      hand: newHand,
      burnPile: [...gameManager.burnPile, card],
    });
  };

  if (pageState === PageState.ChooseDeck)
    return (
      <PageLayout>
        <ParMd className="mb-md">Choose a deck</ParMd>
        <Select className="mb-md" defaultValue="" onChange={handleSelectDeck}>
          <option value="" disabled>
            {!decks?.length
              ? '-- No Decks Avaialble --'
              : '-- Choose a Deck --'}
          </option>
          {decks.map((deck) => (
            <option
              key={deck.id}
              value={deck.id}
              placeholder="--Choose a deck--"
            >
              {deck.name}
            </option>
          ))}
        </Select>
        {selectedDeck && (
          <CardBreakdown currentDeck={selectedDeck} allCards={allCards} />
        )}
        <Button disabled={!selectedDeck} onClick={startGame}>
          Play{' '}
        </Button>
      </PageLayout>
    );
  return (
    <GameBoard>
      <div className="top-section">
        <DrawPile>
          <ParLg>Draw Pile: {gameManager.drawPile.length}</ParLg>
          <div className="card-space mb-sm">
            {gameManager.drawPile.map((card) => {
              const randRotate = (Math.floor(Math.random() * 6) - 3).toString();
              return (
                <CardBack
                  key={card.deckId}
                  className="stack"
                  rotate={randRotate}
                />
              );
            })}
          </div>
          <ButtonPanel>
            <Button disabled={!gameManager.canDrawHand} onClick={drawHand}>
              Draw Hand
            </Button>
            <Button onClick={drawCard}>Draw Card</Button>
          </ButtonPanel>
        </DrawPile>

        <DiscardPile>
          <ParLg>Discard Pile: {gameManager.discardPile.length}</ParLg>
          <div className="card-space">
            {gameManager.discardPile.map((card) => {
              const randRotate = (Math.floor(Math.random() * 6) - 3).toString();
              return (
                <CardBack
                  key={card.deckId}
                  className="stack"
                  rotate={randRotate}
                />
              );
            })}
          </div>
        </DiscardPile>
      </div>
      <Hand>
        <div className="top-section">
          <ParLg className="title">Hand: {gameManager.hand.length}</ParLg>
          <div className="hand-buttons">
            <Button onClick={finishTurn}>Finish Turn</Button>
          </div>
        </div>
        <div className="card-space">
          {gameManager.hand.map((card) => {
            const isSelected = cardSelected === card.deckId;
            return (
              <Card
                {...card}
                key={card.deckId}
                onClick={() => selectCard(card)}
                selected={isSelected}
                renderBelow={
                  isSelected && (
                    <ButtonPanel className="mb-sm">
                      <Button onClick={() => playCard(card)}>Play</Button>
                      <Button onClick={() => burnCard(card)}>Burn</Button>
                    </ButtonPanel>
                  )
                }
              />
            );
          })}
        </div>
      </Hand>
    </GameBoard>
  );
};
const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  align-items: flex-start;
`;
const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .top-section {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
`;
const Hand = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .top-section {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    button {
      margin-left: 1rem;
    }
  }
  .card-space {
    display: flex;
    flex-wrap: wrap;
  }
`;
const DrawPile = styled.div`
  height: 100%;
  .card-space {
    position: relative;
    border: 4px solid #adadad;
    width: 18rem;
    height: 24rem;
    border-radius: 0.5rem;
    .stack {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;
const DiscardPile = styled.div`
  .card-space {
    position: relative;
    border: 4px solid #adadad;
    width: 18rem;
    height: 24rem;
    border-radius: 0.5rem;
    .stack {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;
