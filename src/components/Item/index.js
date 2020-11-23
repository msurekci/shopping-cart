import React from "react";
import Decimal from "decimal.js-light";

import {
  StyledItem,
  StyledName,
  StyledInput,
  StyledInputContainer,
  StyledMaxMessage,
  StyledPrice,
  StyledClear,
  StyledLine
} from "./index.styles";
const Item = ({
  name,
  price,
  currency,
  quantity,
  handleInput,
  handleClearance
}) => {
  return (
    <>
      <StyledItem data-testid="item">
        <StyledName data-testid="name">{name}</StyledName>

        <StyledInputContainer>
          <StyledInput
            name={name}
            type="number"
            value={quantity}
            min={0}
            max={3}
            onChange={e => {
              if (Number(e.target.value) > 3) return;
              handleInput(e);
            }}
            data-testid="quantity"
          ></StyledInput>
          {Number(quantity) === 3 && (
            <StyledMaxMessage data-testid="maxMessage">
              Max quantity is 3
            </StyledMaxMessage>
          )}
        </StyledInputContainer>

        <StyledPrice data-testid="item-total">
          {currency}
          {new Decimal(price).times(Number(quantity)).toNumber()}
        </StyledPrice>

        <StyledClear
          id={name}
          onClick={e => handleClearance(e)}
          data-testid="clear"
        >
          x
        </StyledClear>
      </StyledItem>

      <StyledLine />
    </>
  );
};

export default Item;
