import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

type LoginResponse = {
  token: string;
  userEmail: string;
  userName: string;
  id: string;
};

const initialState: Partial<LoginResponse> = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action) => {},
    logout: (state, action) => {},
  },
});

export const { auth, logout } = authSlice.actions;

export const authSelector = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
