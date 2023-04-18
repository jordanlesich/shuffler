import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.25rem 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #646cff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #7d84ff;
  }
  :disabled {
    background-color: #ccc;
    color: #3f3f3f;
    cursor: not-allowed;
  }
`;
export const ButtonPanel = styled.div`
  display: flex;
  gap: 0.5rem;
`;
