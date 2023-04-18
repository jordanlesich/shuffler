import { ReactNode, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { H1 } from './components/typography';
import { startingCards } from './utils/cardData';
import styled from 'styled-components';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { CardBuilder } from './pages/CardBuilder';
import { Collection } from './pages/Collection';
import { Card, Deck } from './utils/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DeckBuilder } from './pages/DeckBuilder';
import { Shuffler } from './pages/Shuffler';

function App() {
  const { pathname } = useLocation();

  const [allCards, setAllCards] = useLocalStorage<Card[]>(
    'collection',
    startingCards
  );
  const [decks, setDecks] = useLocalStorage<Deck[]>('decks', []);

  const handleAddCard = (newCard: Card) => {
    setAllCards([...allCards, newCard]);
  };

  const handleEditCard = (newCard: Card) => {
    const newCards = allCards.map((card) => {
      if (newCard.id === card.id) {
        return newCard;
      }
      return card;
    });

    setAllCards(newCards);
  };
  const deleteCard = (cardId: string) => {
    const newCards = allCards.filter((card) => card.id !== cardId);
    setAllCards(newCards);
  };

  const addDeck = (newDeck: Deck) => {
    setDecks([...decks, newDeck]);
  };

  const editDeck = (newDeck: Deck) => {
    const newDecks = decks.map((deck) => {
      if (newDeck.id === deck.id) {
        return newDeck;
      }
      return deck;
    });

    setDecks(newDecks);
  };

  const deleteDeck = (deckId: string) => {
    const newDecks = decks.filter((deck) => deck.id !== deckId);
    setDecks(newDecks);
  };

  return (
    <Layout>
      <H1>Cults Workshop</H1>
      <Nav>
        <Link to="/" className={pathname === '/' ? 'selected' : ''}>
          Collection
        </Link>

        <Link
          to="/cardbuilder"
          className={pathname === '/cardbuilder' ? 'selected' : ''}
        >
          Card Builder
        </Link>

        <Link
          to="/deckbuilder"
          className={pathname === '/deckbuilder' ? 'selected' : ''}
        >
          Deck Builder
        </Link>
        <Link to="/shuffler" className={pathname === '/play' ? 'selected' : ''}>
          Shuffler
        </Link>
      </Nav>
      <Routes>
        <Route
          path="/"
          element={<Collection allCards={allCards} deleteCard={deleteCard} />}
        />
        <Route
          path="/cardbuilder"
          element={<CardBuilder onSubmit={handleAddCard} allCards={allCards} />}
        />
        <Route
          path="/cardbuilder/:cardId"
          element={
            <CardBuilder onSubmit={handleEditCard} allCards={allCards} />
          }
        />
        <Route
          path="/deckbuilder"
          element={
            <DeckBuilder
              addDeck={addDeck}
              editDeck={editDeck}
              deleteDeck={deleteDeck}
              decks={decks}
              allCards={allCards}
            />
          }
        />
        <Route
          path="/shuffler"
          element={<Shuffler decks={decks} allCards={allCards} />}
        />
      </Routes>
      {/*  */}
    </Layout>
  );
}

const Nav = ({ children }: { children: ReactNode }) => {
  return <StyledNav>{children}</StyledNav>;
};

const Layout = styled.div`
  width: 1250px;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  .selected {
    color: #bfc1ff;
  }
`;

export default App;
