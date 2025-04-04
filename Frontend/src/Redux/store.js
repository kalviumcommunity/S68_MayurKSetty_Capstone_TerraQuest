import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./loginReducer";

export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});
