import { configureStore } from '@reduxjs/toolkit';
// import notesReducer from "../features/notes/NotesSlice";

export const store = configureStore({
  reducer: {
    // notesReducer
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
