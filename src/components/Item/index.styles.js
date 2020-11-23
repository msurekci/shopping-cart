import styled from "styled-components";

export const StyledItem = styled.div`
  display: flex;
  padding: 8px 0;
  width: 100%;
`;

export const StyledName = styled.div`
  width: 30%;
`;

export const StyledInput = styled.input``;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const StyledMaxMessage = styled.div`
  color: red;
`;

export const StyledPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  width: 10%;
  padding: 8px;
  color: darkorange;
  font-weight: bold;
`;

export const StyledClear = styled.div`
  display: flex;
  align-items: center;
  color: lightgrey;
  font-weight: bold;
`;

export const StyledLine = styled.hr`
  border: none;
  border-top: 2px dotted grey;
`;
