import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './app/store';

export interface AppErrorsState {
  lastError: string | null;
}

const initialState: AppErrorsState = {
  lastError: null,
};

export const appErrorsSlice = createSlice({
  name: 'appErrors',
  initialState,
  reducers: {
    reportError: (
      state,
      action: PayloadAction<{
        errors: { message: string }[];
        operation: 'query' | 'mutation';
      }>
    ) => {
      state.lastError =
        action.payload.operation === 'query'
          ? 'An error occurred when fetching the data'
          : 'An error occurred during data change operation';
    },
    clearError: (state) => {
      state.lastError = null;
    },
  },
});

export const { reportError, clearError } = appErrorsSlice.actions;
export const selectAppErrorsState = (state: RootState) => state.appErrors;
export default appErrorsSlice.reducer;
