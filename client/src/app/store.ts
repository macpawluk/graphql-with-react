import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import appErrorsSlice from '../appErrorsSlice';
import projectsSlice from '../components/projectsList/projectsSlice';

export const store = configureStore({
  reducer: {
    projects: projectsSlice,
    appErrors: appErrorsSlice,
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
