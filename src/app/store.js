import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../components/Basket/basketSlice";

export default configureStore({
  reducer: {
    basket: basketReducer
  }
});
