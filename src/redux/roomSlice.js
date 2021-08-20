import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { db } from "../firebase";

const KEY = "rooms";

export const fetchRoom = createAsyncThunk(
  `${KEY}/fetchRoom`,
  async (params) => {
    const [data, setData] = useState();
    await db
      .collection("projects")
      .doc(params.id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        setData(snapshot.data());
      });
    return data;
  }
);

const roomSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    room: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchRoom.pending]: (state, action) => {},
    [fetchRoom.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.room = action.payload;
    },
    [fetchRoom.rejected]: (state, action) => {},
  },
});
const { reducer, actions } = roomSlice;
export const { setLoading } = actions;
export default reducer;
