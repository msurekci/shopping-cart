import React from "react";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";

import {
  // selectItems,
  fetchItemsAsync,
  // selectItemQuantities,
  // addToCart,
  // removeFromCart,
  resetAllQuantities
} from "./basketSlice";

import Basket from ".";

jest.mock("react-redux");

jest.mock("./basketSlice", () => ({
  selectItems: jest.fn(),
  fetchItemsAsync: jest.fn(),
  selectItemQuantities: jest.fn(),
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  resetAllQuantities: jest.fn()
}));

describe("Basket", () => {
  beforeEach(() => {
    useSelector.mockReturnValue([]);
    useDispatch.mockReturnValue(jest.fn());
  });
  it("should display a message when there are no items to render", () => {
    const { getByText } = render(<Basket />);

    expect(getByText("There are no items in the basket")).toBeInTheDocument();
  });

  it("should call resetAllQuantities when the clear button is clicked", () => {
    const { getByTestId } = render(<Basket />);

    getByTestId("clear-all").click();

    expect(resetAllQuantities).toHaveBeenCalled();
  });

  it("should fetch items on mount", () => {
    render(<Basket />);

    expect(fetchItemsAsync).toHaveBeenCalled();
  });

  it("should display the total amount", () => {
    useSelector.mockReturnValueOnce([
      { name: "Eggs", price: 1, currency: "$" }
    ]);
    useSelector.mockReturnValueOnce({
      Eggs: 1
    });

    const { getByTestId } = render(<Basket />);

    expect(getByTestId("total").textContent).toBe("$1");
  });

  it("should render all items", () => {
    useSelector.mockReturnValueOnce([
      { name: "Eggs", price: 1, currency: "$" },
      { name: "Toilet Roll", price: 2, currency: "$" }
    ]);
    useSelector.mockReturnValueOnce({
      Eggs: 1,
      "Toilet Roll": 1
    });

    const { getAllByTestId } = render(<Basket />);

    expect(getAllByTestId("item")).toHaveLength(2);
  });
});
