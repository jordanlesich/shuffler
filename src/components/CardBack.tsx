import React from 'react';
import styled from 'styled-components';
import { CardBase } from './CardBase';

const StyledCard = styled(CardBase)<{ rotate: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 14rem;
  height: 20rem;
  background-color: #333333;
  border-radius: 0.5rem;
  border: 2px #adadad solid;
  padding: 0.6rem;
  position: relative;
  transform: rotate(${(props) => props.rotate}deg);
`;

export const CardBack = ({
  className,
  rotate = '0',
}: {
  className: string;
  rotate: string;
}) => {
  return <StyledCard className={className} rotate={rotate} />;
};
