import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const StyledBasket = styled.div`
  width: 440px;
  border: 1px black solid;
  padding: 16px;
`;

export const StyledTotal = styled.div`
  display: flex;
  flex-grow: 2;
  padding: 8px;
  font-size: 24px;
`;

export const StyledClear = styled.div`
  display: flex;
  flex-grow: 1;
  font-weight: bold;
  color: grey;
  justify-content: center;
  align-items: center;
`;

export const StyledSummaryContainer = styled.div`
  display: flex;
  padding: 16px 8px;
`;

export const StyledNoItemsMessage = styled.div`
  color: red;
  text-align: center;
`;

export const StyledButton = styled.button`
  color: white;
  background: cornflowerblue;
  font-weight: bold;
  border: 1px solid grey;
`;
