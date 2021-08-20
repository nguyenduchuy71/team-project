import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../redux/roomSlice";
import projectsReducer from "../redux/projectSlice";
export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    projects: projectsReducer,
  },
});
