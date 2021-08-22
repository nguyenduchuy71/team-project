import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../redux/projectSlice";
import chatReducer from "../redux/chatSlice";
export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    chat: chatReducer,
  },
});
