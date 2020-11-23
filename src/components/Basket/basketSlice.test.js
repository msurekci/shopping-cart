import axios from "axios";

import basketSliceReducer, {
  addToCart,
  removeFromCart,
  resetAllQuantities,
  addMultipleToCart,
  fetchItemsAsync
} from "./basketSlice";

jest.mock("axios");

describe("basketSlice", () => {
  describe("reducers", () => {
    it("should update the quantity when adding item to cart", () => {
      const initialState = { itemQuantities: { Eggs: 0 } };

      const result = basketSliceReducer(
        initialState,
        addToCart({ name: "Eggs", value: 1 })
      );

      expect(result).toEqual({ itemQuantities: { Eggs: 1 } });
    });

    it("should remove the item from items list and quantities list", () => {
      const initialState = {
        itemsAdded: [{ name: "Eggs" }],
        itemQuantities: { Eggs: 0 }
      };

      const result = basketSliceReducer(
        initialState,
        removeFromCart({ name: "Eggs" })
      );

      expect(result).toEqual({ itemQuantities: {}, itemsAdded: [] });
    });

    it("should reset all the quantities to 0", () => {
      const initialState = {
        itemQuantities: {
          Eggs: 1,
          Chips: 1,
          Sausage: 1
        }
      };

      const result = basketSliceReducer(initialState, resetAllQuantities);

      expect(result).toEqual({
        itemQuantities: {
          Eggs: 0,
          Chips: 0,
          Sausage: 0
        }
      });
    });

    it("should add multiple items with a default quantity of 0", () => {
      const initialState = {
        itemQuantities: {},
        itemsAdded: []
      };

      const itemEggs = {
        name: "Eggs"
      };
      const itemChips = {
        name: "Chips"
      };
      const result = basketSliceReducer(
        initialState,
        addMultipleToCart([itemEggs, itemChips])
      );

      expect(result).toEqual({
        itemQuantities: {
          Eggs: 0,
          Chips: 0
        },
        itemsAdded: [itemEggs, itemChips]
      });
    });
  });

  describe("thunk", () => {
    it("should fetch all items", async () => {
      axios.get.mockResolvedValue({
        data: [
          {
            name: "Toilet Roll",
            price: 1.3,
            currency: "£"
          },
          {
            name: "Pasta",
            price: 0.58,
            currency: "£"
          }
        ]
      });
      const dispatchSpy = jest.fn();
      await fetchItemsAsync()(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith({
        payload: [
          {
            currency: "£",
            name: "Toilet Roll",
            price: 1.3
          },
          {
            currency: "£",
            name: "Pasta",
            price: 0.58
          }
        ],
        type: "basket/addMultipleToCart"
      });
    });
  });
});
