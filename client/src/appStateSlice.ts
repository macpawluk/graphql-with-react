import {
  ActionReducerMapBuilder,
  AnyAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './app/store';

export interface AppErrorsState {
  lastError: string | null;
  progressCounter: { [key: string]: number };
}

const initialState: AppErrorsState = {
  lastError: null,
  progressCounter: {},
};

const registerProgressHandlersForThunks = (
  builder: ActionReducerMapBuilder<AppErrorsState>
) => {
  builder.addMatcher(
    (action: AnyAction) =>
      action.type.endsWith('/pending') ||
      action.type.endsWith('/fulfilled') ||
      action.type.endsWith('/rejected'),
    (state, action) => {
      const progressCounter = state.progressCounter;
      const actionKey = getActionKey(action.type);
      const isInProgress = action.type.endsWith('/pending');
      const currentCounter = progressCounter[actionKey] ?? 0;
      const change = isInProgress ? 1 : -1;

      progressCounter[actionKey] = Math.max(currentCounter + change, 0);
    }
  );
};

export const appStateSlice = createSlice({
  name: 'appState',
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
  extraReducers: (builder) => registerProgressHandlersForThunks(builder),
});

const getActionKey = (actionType: string) => {
  const removeSuffix = (value: string, suffix: string) =>
    value.substring(0, value.length - suffix.length);

  if (actionType.endsWith('/pending'))
    return removeSuffix(actionType, '/pending');
  if (actionType.endsWith('/fulfilled'))
    return removeSuffix(actionType, '/fulfilled');
  if (actionType.endsWith('/rejected'))
    return removeSuffix(actionType, '/rejected');
  return '';
};

export const { reportError, clearError } = appStateSlice.actions;
export const selectAppState = (state: RootState) => state.appState;
export const selectIsGlobalProgressOn = (state: RootState) => {
  const progressCounter = state.appState.progressCounter;
  return Object.keys(progressCounter).find((key) => !!progressCounter[key]);
};
export default appStateSlice.reducer;
