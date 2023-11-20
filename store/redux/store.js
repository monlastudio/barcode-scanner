import { configureStore } from "@reduxjs/toolkit";

import historiesReducer from "./histories";

export const store = configureStore({
  reducer: {
    histories: historiesReducer,
  },
});
