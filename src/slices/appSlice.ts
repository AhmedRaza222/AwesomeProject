import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isLoggedIn: boolean;
  tollName: string | null;
}

const initialState: AppState = {
  isLoggedIn: false,
  tollName: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.tollName = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.tollName = null;
    },
  },
});

export const { login, logout } = appSlice.actions;
export default appSlice.reducer;
