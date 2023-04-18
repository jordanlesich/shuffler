import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useState,
} from 'react';
import styled from 'styled-components';
import { Button, ButtonPanel } from '../components/Button';
import { Card } from '../components/Card';
import {
  Checkbox,
  CheckboxWrapper,
  Form,
  FormGroup,
  Input,
  Label,
  Select,
  SubmitButton,
  TextArea,
} from '../components/form';
import { H2, H3, ParLg, ParMd, ParSm, ParXs } from '../components/typography';
import { Card as CardType, Deck } from '../utils/types';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { getCardOfType } from '../utils/cardUtils';
import { CardBreakdown } from '../components/CardBreakdown';

const DECK_MIN = 20;
const EMPTY_DECK = {
  id: '',
  name: '',
  cards: [],
};
type DeckFormProps = {
  addDeck: (deck: Deck) => void;
  editDeck: (deck: Deck) => void;
  deleteDeck: (deckId: string) => void;
  allCards: CardType[];
  decks: Deck[];
};

export const DeckBuilder = ({
  addDeck,
  editDeck,
  deleteDeck,
  allCards,
  decks,
}: DeckFormProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentDeck, setCurrentDeck] = useState<Deck>(EMPTY_DECK);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isEditing) {
      editDeck(currentDeck);
      navigate('/');
    } else {
      addDeck({ ...currentDeck, id: uuid() });
      setCurrentDeck({
        id: '',
        name: '',
        cards: [],
      });
    }
  };

  const addCard = (card: CardType) => {
    setCurrentDeck({
      ...currentDeck,
      cards: [...currentDeck.cards, { ...card, deckId: uuid() }],
    });
  };
  const removeCard = (card: CardType) => {
    const hasCard = currentDeck.cards.find((c) => c.id === card.id);

    if (hasCard) {
      const newDeck = currentDeck.cards.filter(
        (c) => c.deckId !== hasCard.deckId
      );

      setCurrentDeck({
        ...currentDeck,
        cards: newDeck,
      });
    } else {
      console.warn('Card not found in deck');
      return;
    }
  };
  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setCurrentDeck({ ...currentDeck, [name]: value });
  };

  const handleSelectCard = (index: number) => {
    if (selectedCard === index) {
      setSelectedCard(null);
    } else {
      setSelectedCard(index);
    }
  };

  const switchDeck = (e: any) => {
    const deckId = e.target.value;

    if (deckId === '') {
      setCurrentDeck(EMPTY_DECK);
      return;
    }

    const deck = decks.find((deck) => deck.id === deckId);

    if (deck) {
      setCurrentDeck(deck);
    }
  };

  const switchMode = () => {
    if (isEditing) {
      setIsEditing(false);
      setCurrentDeck(EMPTY_DECK);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <PageLayout>
      <ParLg className="mb-md">
        {isEditing ? 'Editor Mode' : 'Creator Mode'}
      </ParLg>
      <DeckSelect>
        <CheckboxWrapper className="mb-md">
          <Checkbox
            id="edit"
            name="Edit Deck"
            defaultChecked={false}
            onChange={switchMode}
          />
          <Label htmlFor="edit">Edit Deck</Label>
        </CheckboxWrapper>
        {isEditing && (
          <FormGroup>
            <Label htmlFor="deck">Current Deck</Label>
            <Select onChange={switchDeck} defaultValue="" className="mb-sm">
              <option value="" disabled>
                {!decks?.length
                  ? '-- No Decks Avaialble --'
                  : '-- Choose a Deck --'}
              </option>
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        )}
        {isEditing && currentDeck.id && (
          <Button
            onClick={() => {
              setCurrentDeck(EMPTY_DECK);
              deleteDeck(currentDeck.id);
              if (!decks.length) {
                setIsEditing(false);
              }
            }}
          >
            Delete Deck
          </Button>
        )}
      </DeckSelect>
      <BuilderLayout>
        {(isEditing && currentDeck.id) || !isEditing ? (
          <CollectionBoard>
            {allCards?.map((card, index) => {
              const isSelected = selectedCard === index;
              return (
                <Card
                  key={card.id}
                  {...card}
                  selected={isSelected}
                  onClick={() => handleSelectCard(index)}
                  renderBelow={
                    isSelected && (
                      <ButtonPanel>
                        <Button onClick={() => addCard(card)}>+</Button>
                        <Button onClick={() => removeCard(card)}>-</Button>
                      </ButtonPanel>
                    )
                  }
                />
              );
            })}
          </CollectionBoard>
        ) : (
          <Alert>
            <H3>Choose a Deck</H3>
          </Alert>
        )}
        <Form onSubmit={handleSubmit} className="mb-md">
          <FormGroup className="mb-sm">
            <Label htmlFor="name">
              {currentDeck?.name ? currentDeck.name : '(Untitled)'}{' '}
            </Label>
            <Input
              id="name"
              name="name"
              value={currentDeck.name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <CardBreakdown allCards={allCards} currentDeck={currentDeck} />
          <SubmitButton
            disabled={!currentDeck.name || currentDeck.cards.length < DECK_MIN}
          >
            Build Deck
          </SubmitButton>
          <ParXs>- Deck must have a name</ParXs>
          <ParXs>- Deck must have {DECK_MIN} cards</ParXs>
        </Form>
      </BuilderLayout>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const CollectionBoard = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 800px;
`;
const BuilderLayout = styled.div`
  display: flex;
  width: 100%;
  .preview {
    margin-left: 6rem;
  }
`;
const DeckSelect = styled.div`
  margin-bottom: 2rem;
  width: 30rem;
`;
const Alert = styled.div`
  width: 50rem;
  margin-right: 6rem;
  border-radius: 0.5rem;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
