import { createSlice } from "@reduxjs/toolkit";

const historiesSlice = createSlice({
  name: "histories",
  initialState: {
    data: [],
  },
  reducers: {
    addHistory: (state, action) => {
      state.data.push(action.payload.data);
    },
    removeHistory: (state, action) => {
      state.data.splice(
        state.data.findIndex((item) => item.id == action.payload.id),
        1
      );
    },
  },
});

export const addHistory = historiesSlice.actions.addHistory;
export const removeHistory = historiesSlice.actions.removeHistory;
export default historiesSlice.reducer;
