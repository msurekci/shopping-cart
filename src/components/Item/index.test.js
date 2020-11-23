import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Item from ".";

describe("Item", () => {
  const defaultProps = {
    price: 1,
    quantity: 2
  };

  it("should render the name", () => {
    const props = {
      ...defaultProps,
      name: "Eggs"
    };

    const { getByTestId } = render(<Item {...props} />);

    expect(getByTestId("name").textContent).toBe("Eggs");
  });
  it("should display the correct price", () => {
    const props = {
      ...defaultProps,
      currency: "$"
    };

    const { getByTestId } = render(<Item {...props} />);

    expect(getByTestId("item-total").textContent).toBe("$2");
  });

  it("should call the handleClearence func when clear is clicked", () => {
    const spyHandleClerance = jest.fn();
    const props = {
      ...defaultProps,
      handleClearance: spyHandleClerance
    };

    const { getByTestId } = render(<Item {...props} />);

    getByTestId("clear").click();

    expect(spyHandleClerance).toHaveBeenCalled();
  });

  it("should call the handleInput func when the input field changes", () => {
    const spyHandleInput = jest.fn();
    const props = {
      ...defaultProps,
      handleInput: spyHandleInput
    };

    const { getByTestId } = render(<Item {...props} />);
    const input = getByTestId("quantity");

    fireEvent.change(input, { target: { value: "1" } });
    expect(spyHandleInput).toHaveBeenCalled();
  });

  it("should not update quantity if quantity is already 3 and user wants to increase it", () => {
    const spyHandleInput = jest.fn();
    const props = {
      ...defaultProps,
      quantity: 3,
      handleInput: spyHandleInput
    };

    const { getByTestId } = render(<Item {...props} />);

    const input = getByTestId("quantity");
    fireEvent.change(input, { target: { value: "4" } });
    expect(spyHandleInput).not.toHaveBeenCalled();
  });

  it("should display a message when the quantity is 3", () => {
    const props = {
      ...defaultProps,
      quantity: 3
    };

    const { getByTestId } = render(<Item {...props} />);

    expect(getByTestId("maxMessage")).toBeInTheDocument();
  });
});
