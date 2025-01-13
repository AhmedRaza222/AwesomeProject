import { createSlice } from '@reduxjs/toolkit';

interface AccountState {
  userDetails: any;
}

const initialState: AccountState = {
  userDetails: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    clearUserDetails(state) {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = accountSlice.actions;
export default accountSlice.reducer;
