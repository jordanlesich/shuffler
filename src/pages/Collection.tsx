import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, ButtonPanel } from '../components/Button';
import { Card } from '../components/Card';
import { Card as CardType } from '../utils/types';

const CollectionBoard = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Collection = ({
  allCards,
  deleteCard,
}: {
  allCards: CardType[];
  deleteCard: (cardId: string) => void;
  // editCard: (cardId: string) => void;
}) => {
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  const navigate = useNavigate();
  const handleSelectCard = (index: number) => {
    if (selectedCard === index) {
      setSelectedCard(null);
    } else {
      setSelectedCard(index);
    }
  };

  const editCard = (cardId: string) => {
    const cardExists = allCards.find((card) => card.id === cardId);
    if (cardExists) {
      navigate(`/cardbuilder/${cardId}`);
    }
  };

  return (
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
              isSelected ? (
                <ButtonPanel>
                  <Button onClick={() => editCard(card.id)}>Edit</Button>
                  <Button onClick={() => deleteCard(card.id)}>Delete</Button>
                </ButtonPanel>
              ) : null
            }
          />
        );
      })}
    </CollectionBoard>
  );
};
