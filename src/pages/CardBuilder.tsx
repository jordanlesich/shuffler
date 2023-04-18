import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '../components/Card';
import {
  CheckboxWrapper,
  Form,
  FormGroup,
  Input,
  Label,
  Select,
  SubmitButton,
  TextArea,
} from '../components/form';
import { H2, ParLg, ParMd } from '../components/typography';
import { Card as CardType, CType, CultTypes } from '../utils/types';
import { v4 as uuid } from 'uuid';

type CardFormProps = {
  onSubmit: (card: CardType) => void;
  allCards: CardType[];
};
export const CardBuilder: React.FC<CardFormProps> = ({
  onSubmit,
  allCards,
}) => {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const isEditing = cardId !== undefined;
  const editingCard = isEditing
    ? allCards.find((card) => card.id === cardId)
    : undefined;
  const [card, setCard] = useState<CardType>(
    isEditing && editingCard
      ? editingCard
      : {
          id: '',
          title: '',
          nrg: 0,
          type: CType.Unknown,
          cult: CultTypes.Any,
          actions: [],
          health: undefined,
        }
  );

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setCard({ ...card, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isEditing) {
      onSubmit(card);
      navigate('/');
    } else {
      onSubmit({ ...card, id: uuid() });
      setCard({
        id: '',
        title: '',
        nrg: 0,
        type: CType.Unknown,
        cult: CultTypes.Any,
        actions: [],
      });
    }
  };
  const isConstructType =
    card.type === CType.Construct || card.type === CType.Ritual;
  const isCreatureType =
    card.type === CType.Creature ||
    card.type === CType.Hero ||
    card.type === CType.Mob;
  return (
    <PageLayout>
      <ParLg className="mb-md">{isEditing ? 'Edit Mode' : 'Create Mode'}</ParLg>
      <ParMd className="mb-md">Total Cards: {allCards?.length}</ParMd>
      <BuilderLayout>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="type">Type:</Label>
            <Select onChange={handleInputChange} name="type">
              {Object.entries(CType).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="title">Title:</Label>
            <Input
              id="title"
              name="title"
              value={card.title}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="nrg">Energy:</Label>
            <Input
              id="nrg"
              name="nrg"
              type="number"
              value={card.nrg}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="alignment">Cult Type:</Label>
            <Select onChange={handleInputChange}>
              {Object.entries(CultTypes).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="actions">Actions (comma-separated):</Label>
            <TextArea
              id="actions"
              name="actions"
              value={card.actions.join(',')}
              onChange={(event) =>
                setCard({ ...card, actions: event.target.value.split(',') })
              }
            />
          </FormGroup>
          {isConstructType && (
            <FormGroup>
              <Label htmlFor="health">Health:</Label>
              <Input
                id="health"
                name="health"
                type="number"
                value={card.health || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
          )}
          {isCreatureType && (
            <>
              <FormGroup>
                <Label htmlFor="attack">Attack:</Label>
                <Input
                  id="attack"
                  name="attack"
                  type="number"
                  value={card.attack || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="defend">Defend:</Label>
                <Input
                  id="defend"
                  name="defend"
                  type="number"
                  value={card.defend || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="health">Health:</Label>
                <Input
                  id="health"
                  name="health"
                  type="number"
                  value={card.health || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="sacrifice">Sacrifice Effect:</Label>
                <Input
                  id="sacrifice"
                  name="onSacrifice"
                  value={card.onSacrifice || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </>
          )}
          <SubmitButton type="submit">Add Card</SubmitButton>
        </Form>
        <div className="preview">
          <H2>Preview</H2>
          <Card {...card} />
        </div>
      </BuilderLayout>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const BuilderLayout = styled.div`
  display: flex;
  width: 100%;
  .preview {
    margin-left: 6rem;
  }
`;
