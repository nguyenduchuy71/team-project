import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export const getChatAsync = createAsyncThunk(
  "chat/getChatAsync",
  async (payload) => {
    const [messages, loading] = useCollection(
      payload.id &&
        (await db
          .collection("rooms")
          .doc(payload.id)
          .collection("messages")
          .orderBy("timestamp", "asc"))
    );
    console.log(messages);
    return { messages };
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getChatAsync.fulfilled]: (state, action) => {
      return action.payload.messages;
    },
  },
});
export default chatSlice.reducer;
