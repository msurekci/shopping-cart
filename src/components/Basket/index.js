import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Decimal from "decimal.js-light";

import Item from "../Item";

import {
  selectItems,
  fetchItemsAsync,
  selectItemQuantities,
  addToCart,
  removeFromCart,
  resetAllQuantities
} from "./basketSlice";
import {
  StyledContainer,
  StyledBasket,
  StyledTotal,
  StyledClear,
  StyledSummaryContainer,
  StyledNoItemsMessage,
  StyledButton
} from "./index.styles";

const Basket = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const quantities = useSelector(selectItemQuantities);

  const total = items
    .reduce((total, item) => {
      return (total = total.plus(
        new Decimal(item.price).times(Number(quantities[item.name]))
      ));
    }, new Decimal(0))
    .toNumber();

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, []);

  const handleInput = e => {
    dispatch(addToCart({ name: e.target.name, value: e.target.value }));
  };

  const handleClearance = e => {
    dispatch(removeFromCart({ name: e.target.id }));
  };

  const handleClick = () => {
    alert(`Total is: ${items[0].currency}${total}`);
  };

  return (
    <StyledContainer data-testid="basket">
      <StyledBasket>
        {!items.length && (
          <StyledNoItemsMessage>
            There are no items in the basket
            <hr />
          </StyledNoItemsMessage>
        )}
        {!!items.length &&
          items.map(item => {
            return (
              <Item
                key={item.name}
                name={item.name}
                price={item.price}
                quantity={quantities[item.name]}
                currency={item.currency}
                handleInput={handleInput}
                handleClearance={handleClearance}
              />
            );
          })}
        <StyledSummaryContainer>
          <StyledTotal data-testid="total">
            {(items[0] && items[0].currency) || "£"}
            {total}
          </StyledTotal>
          <StyledClear
            onClick={() => dispatch(resetAllQuantities())}
            data-testid="clear-all"
          >
            Clear
          </StyledClear>
          <StyledButton onClick={handleClick}>Check Out ></StyledButton>
        </StyledSummaryContainer>
      </StyledBasket>
    </StyledContainer>
  );
};

export default Basket;
