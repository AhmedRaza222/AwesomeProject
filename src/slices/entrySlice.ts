import { createSlice } from '@reduxjs/toolkit';

interface EntryState {
  entryData: any;
}

const initialState: EntryState = {
  entryData: null,
};

const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    setEntryData(state, action) {
      state.entryData = action.payload;
    },
  },
});

export const { setEntryData } = entrySlice.actions;
export default entrySlice.reducer;
