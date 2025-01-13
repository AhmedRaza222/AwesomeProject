import { createSlice } from '@reduxjs/toolkit';

interface ExitState {
  exitData: any;
}

const initialState: ExitState = {
  exitData: null,
};

const exitSlice = createSlice({
  name: 'exit',
  initialState,
  reducers: {
    setExitData(state, action) {
      state.exitData = action.payload;
    },
  },
});

export const { setExitData } = exitSlice.actions;
export default exitSlice.reducer;
