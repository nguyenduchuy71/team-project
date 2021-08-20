import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { db } from "../firebase";

const KEY = "projects";

export const fetchProjects = createAsyncThunk(
  `${KEY}/fetchProjects`,
  async () => {
    const [project, setProject] = useState([]);
    db.collection("projects").onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProject(items);
    });
    return project;
  }
);

const projectsSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    project: [],
  },
  reducers: {},
  extraReducers: {
    [fetchProjects.pending]: (state, action) => {},
    [fetchProjects.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.project = action.payload;
    },
    [fetchProjects.rejected]: (state, action) => {},
  },
});
const { reducer, actions } = projectsSlice;
export const { setLoading } = actions;
export default reducer;
