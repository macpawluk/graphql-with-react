import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Project } from './../../models';
import { fetchAllProjects, fetchProjectDetails } from './projectsApi';

export interface ProjectsState {
  items: Project[];
  fetchedAll: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProjectsState = {
  items: [],
  fetchedAll: false,
  status: 'idle',
};

export const getSingleProjectsAsync = createAsyncThunk(
  'projects/getSingle',
  async (id: string) => {
    const response = await fetchProjectDetails(id);
    return response;
  }
);

export const getAllProjectsAsync = createAsyncThunk(
  'projects/getAll',
  async () => {
    const response = await fetchAllProjects();
    return response;
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const indexToUpdate = state.items.findIndex(
        (p) => p.id === action.payload.id
      );
      state.items[indexToUpdate] = action.payload;
    },
    removeProject: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.items.findIndex(
        (p) => p.id === action.payload
      );
      state.items.splice(indexToRemove, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProjectsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleProjectsAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        const foundIndex = state.items?.findIndex(
          (p) => p.id === action.payload?.id
        );

        if (foundIndex >= 0) {
          state.items[foundIndex] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(getAllProjectsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProjectsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.fetchedAll = true;
        state.items = action.payload;
      });
  },
});

export const { addProject, updateProject, removeProject } =
  projectsSlice.actions;

export const selectProjectsState = (state: RootState) => state.projects;
export const selectProject = (state: RootState, id: string) =>
  state.projects?.items?.find((p) => p.id === id);
export default projectsSlice.reducer;
