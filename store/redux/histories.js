import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const HISTORY_KEY = "histories";

export const fetchDataFromAsyncStorage = createAsyncThunk(
  "data/fetchData",
  async (_, thunkAPI) => {
    try {
      const data = await AsyncStorage.getItem(HISTORY_KEY);
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
);

export const addDataToAsyncStorage = createAsyncThunk(
  "data/addData",
  async (newData, thunkAPI) => {
    try {
      const existingData = await AsyncStorage.getItem(HISTORY_KEY);
      const parsedData = JSON.parse(existingData) || [];
      const index = parsedData.findIndex((item) => item.id === newData.id);
      
      if (index === -1) {
        parsedData.push(newData);
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(parsedData));
      }

      return parsedData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const removeDataFromAsyncStorage = createAsyncThunk(
  "data/removeData",
  async (id, thunkAPI) => {
    try {
      const existingData = await AsyncStorage.getItem(HISTORY_KEY);
      const parsedData = JSON.parse(existingData) || [];
      const indexToRemove = parsedData.findIndex((item) => item.id == id);
      parsedData.splice(indexToRemove, 1);

      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(parsedData));

      return parsedData;
    } catch (error) {
      throw error;
    }
  }
);

const historiesSlice = createSlice({
  name: "histories",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromAsyncStorage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
      })
      .addCase(fetchDataFromAsyncStorage.rejected, (state) => {
        state.data = null;
        state.error = true;
      })
      .addCase(addDataToAsyncStorage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
      })
      .addCase(addDataToAsyncStorage.rejected, (state) => {
        state.data = null;
        state.error = true;
      })
      .addCase(removeDataFromAsyncStorage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
      })
      .addCase(removeDataFromAsyncStorage.rejected, (state) => {
        state.data = null;
        state.error = true;
      });
  },
});

export default historiesSlice.reducer;
