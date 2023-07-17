import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import uiReducer from "./uiSlice"

const store = configureStore({
  reducer: {
    api: apiReducer,
    ui: uiReducer,
  },
});

export default store;
