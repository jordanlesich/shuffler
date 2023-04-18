import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Card as CardType, CType } from '../utils/types';
import { CardBase } from './CardBase';
import { ParMd, ParSm, ParXs, ParXxs } from './typography';
// import styled from 'styled-components';

const StyledCard = styled(CardBase)`
  .top-row {
    display: flex;
    align-items: center;
    p {
      margin-right: 1.5rem;
    }
  }
  .img-block {
    width: 100%;
    height: 6.5rem;
    background-color: #adadad;
  }
  .render-below {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  cursor: pointer;
  transition: transform 0.2s;

  :hover {
    transform: scale(1.05);
  }
  &.selected {
    border: 2px #646cff solid;
    transform: scale(1.05);
  }
  .stats {
    margin-top: auto;
    margin-left: auto;
  }
`;

const OuterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

export const Card = ({
  actions,
  nrg,
  title,
  renderBelow,
  selected,
  onClick,
  health,
  defend,
  attack,
  type,
  onSacrifice,
}: CardType & {
  renderBelow?: ReactNode;
  selected?: boolean;
  onClick?: (e: any) => void;
}) => {
  const isConstructType = type === CType.Construct || type === CType.Ritual;
  const isCreatureType =
    type === CType.Creature || type === CType.Hero || type === CType.Mob;
  return (
    <OuterBox>
      <StyledCard className={selected ? 'selected' : ''} onClick={onClick}>
        <div className="top-row mb-xs">
          <ParXs className="nrg-display">⚡{nrg}</ParXs>
          <ParSm>{title}</ParSm>
        </div>
        <div className="img-block mb-xs" />
        <ParXxs className="capitalize mb-xs italic">{type}</ParXxs>
        {actions?.map((action) => (
          <ParXxs key={action}>- {action}</ParXxs>
        ))}
        {onSacrifice && <ParXxs>💀: {onSacrifice}</ParXxs>}
        {isCreatureType && (
          <ParXs className="stats">
            ⚔️ {attack}/🛡️{defend}/❤️{health}
          </ParXs>
        )}
        {isConstructType && <ParXs className="stats">❤️{health}</ParXs>}
      </StyledCard>
      <div className="render-below">{renderBelow}</div>
    </OuterBox>
  );
};
