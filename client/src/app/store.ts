import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import appStateSlice from '../appStateSlice';
import projectsSlice from '../components/projectsList/projectsSlice';

export const store = configureStore({
  reducer: {
    projects: projectsSlice,
    appState: appStateSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
