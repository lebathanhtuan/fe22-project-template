import styled, { css } from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  border: 3px solid ${({ isSelected }) => (isSelected ? "red" : "black")};
  color: black;
  background-color: white;
  cursor: pointer;

  &:hover {
    color: green;
  }

  & > p {
    margin-bottom: 0;
  }

  ${({ isNew }) =>
    isNew &&
    css`
      color: red;
      background-color: yellow;
    `}
`;
