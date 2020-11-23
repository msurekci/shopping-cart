import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    itemsAdded: [],
    itemQuantities: {}
  },
  reducers: {
    addToCart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.itemQuantities[action.payload.name] = action.payload.value;
    },
    removeFromCart: (state, action) => {
      delete state.itemQuantities[action.payload.name];
      state.itemsAdded = state.itemsAdded.filter(
        item => item.name !== action.payload.name
      );
    },
    resetAllQuantities: state => {
      state.itemQuantities = Object.getOwnPropertyNames(
        state.itemQuantities
      ).reduce((quantities, key) => {
        return (quantities = { ...quantities, [key]: 0 });
      }, {});
    },
    addMultipleToCart: (state, action) => {
      state.itemsAdded = [...action.payload];

      state.itemQuantities = action.payload.reduce((acc, item) => {
        return { ...acc, [item.name]: 0 };
      }, {});
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  addMultipleToCart,
  resetAllQuantities
} = basketSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchItemsAsync = _ => async dispatch => {
  const { data } = await axios.get("http://localhost:3001/items");
  const items = data.map(item => {
    return {
      name: item.name,
      price: item.price,
      currency: item.currency
    };
  });

  dispatch(addMultipleToCart(items));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectItems = state => state.basket.itemsAdded;
export const selectItemQuantities = state => state.basket.itemQuantities;

export default basketSlice.reducer;
