import { Issue, Project } from '@app/models';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GraphQlResponse } from '../../shared';
import { addIssue, removeIssue, updateIssue } from './../issuesList/issuesApi';
import {
  addProject as addProjectApi,
  fetchAllProjects,
  fetchProjectDetails,
  removeProject,
  updateProject,
} from './projectsApi';

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
  async (id: string, { dispatch }) => {
    const response = await fetchProjectDetails(id, dispatch);
    return response;
  }
);

export const getAllProjectsAsync = createAsyncThunk(
  'projects/getAll',
  async (_, { dispatch }) => {
    const response = await fetchAllProjects(dispatch);
    return response;
  }
);

export const addProjectAsync = createAsyncThunk(
  'projects/add',
  async (project: Project, { dispatch }) => {
    const addResponse = await addProjectApi(project, dispatch);
    return GraphQlResponse.hasErrors(addResponse)
      ? null
      : addResponse.data.addProject;
  }
);

export const updateProjectAsync = createAsyncThunk(
  'projects/update',
  async (project: Project, { dispatch }) => {
    const updateResponse = await updateProject(project, dispatch);

    return GraphQlResponse.hasErrors(updateResponse)
      ? null
      : updateResponse.data.updateProject;
  }
);

export const removeProjectAsync = createAsyncThunk(
  'projects/remove',
  async (projectId: string, { dispatch }) => {
    const removeResponse = await removeProject(projectId, dispatch);

    return GraphQlResponse.hasErrors(removeResponse) ? null : projectId;
  }
);

export const addIssueAsync = createAsyncThunk(
  'issues/add',
  async (args: { issue: Issue; projectId: string }, { dispatch }) => {
    const { issue, projectId } = args;

    const addResponse = await addIssue(issue, projectId, dispatch);
    return GraphQlResponse.hasErrors(addResponse)
      ? null
      : {
          issue: addResponse.data.addIssue,
          projectId,
        };
  }
);

export const updateIssueAsync = createAsyncThunk(
  'issues/update',
  async (args: { issue: Issue; projectId: string }, { dispatch }) => {
    const { issue, projectId } = args;
    const editResponse = await updateIssue(issue, dispatch);

    return GraphQlResponse.hasErrors(editResponse)
      ? null
      : {
          issue: editResponse.data.updateIssue,
          projectId,
        };
  }
);

export const changeIssueStatusAsync = createAsyncThunk(
  'issues/changeStatus',
  async (
    args: {
      projectId: string;
      issue: Issue;
      newStatus: Issue['status'];
    },
    { dispatch }
  ) => {
    const { projectId, issue, newStatus } = args;
    const updatedIssue = { ...issue, status: newStatus };
    updateIssue(updatedIssue, dispatch).catch((error) => console.log(error));

    return {
      projectId: projectId,
      issueId: issue.id,
      newStatus: newStatus,
    };
  }
);

export const removeIssueAsync = createAsyncThunk(
  'issues/remove',
  async (args: { projectId: string; issueId: string }, { dispatch }) => {
    removeIssue(args.issueId, dispatch).catch((error) => console.log(error));
    return args;
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProjectsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleProjectsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getSingleProjectsAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        if (GraphQlResponse.hasErrors(action.payload)) {
          return;
        }

        const project = action.payload.data.project;
        const foundIndex = state.items?.findIndex((p) => p.id === project?.id);

        if (foundIndex >= 0) {
          state.items[foundIndex] = project;
        } else {
          state.items.push(project);
        }
      })
      .addCase(getAllProjectsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProjectsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getAllProjectsAsync.fulfilled, (state, action) => {
        const projects = action.payload.data.projects;

        state.status = 'idle';
        state.fetchedAll = true;
        state.items = projects;
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        state.items.push(action.payload);
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload) {
          return;
        }

        const indexToUpdate = state.items.findIndex((p) => p.id === payload.id);
        if (indexToUpdate < 0) {
          return;
        }
        state.items[indexToUpdate] = payload;
      })
      .addCase(removeProjectAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload) {
          return;
        }

        const indexToRemove = state.items.findIndex(
          (p) => p.id === action.payload
        );
        if (indexToRemove < 0) {
          return;
        }
        state.items.splice(indexToRemove, 1);
      })
      .addCase(addIssueAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload) {
          return;
        }

        const { projectId, issue } = payload;
        const projectToUpdate = state.items.find((p) => p.id === projectId);
        if (!projectToUpdate) {
          return;
        }

        projectToUpdate.issuesConnection.items.push(issue);
      })
      .addCase(updateIssueAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload) {
          return;
        }

        const { projectId, issue } = payload;
        updateIssueInStore(state, projectId, issue.id, () => issue);
      })
      .addCase(changeIssueStatusAsync.fulfilled, (state, action) => {
        const { projectId, issueId, newStatus } = action.payload;

        updateIssueInStore(state, projectId, issueId, (issue) => {
          issue.status = newStatus;
          return issue;
        });
      })
      .addCase(removeIssueAsync.fulfilled, (state, action) => {
        const { projectId, issueId } = action.payload;
        const projectToUpdate = state.items.find((p) => p.id === projectId);
        if (!projectToUpdate) {
          return;
        }
        const indexToRemove = projectToUpdate.issuesConnection.items.findIndex(
          (p) => p.id === issueId
        );
        if (indexToRemove < 0) {
          return;
        }
        projectToUpdate.issuesConnection.items.splice(indexToRemove, 1);
      });
  },
});

const updateIssueInStore = (
  state: ProjectsState,
  projectId: string,
  issueId: string,
  updater: (issue: Issue) => Issue
) => {
  const projectToUpdate = state.items.find((p) => p.id === projectId);
  if (!projectToUpdate) {
    return;
  }
  const indexToUpdate = projectToUpdate.issuesConnection.items.findIndex(
    (p) => p.id === issueId
  );
  if (indexToUpdate < 0) {
    return;
  }

  const updatedDate = new Date().toISOString();
  const issueToUpdate = projectToUpdate.issuesConnection.items[indexToUpdate];

  issueToUpdate.updated = updatedDate;

  const prevStatus = issueToUpdate.status;
  const updatedIssue = updater(issueToUpdate);

  if (prevStatus !== updatedIssue.status) {
    issueToUpdate.lastStatusChange = updatedDate;
  }

  projectToUpdate.issuesConnection.items[indexToUpdate] = updatedIssue;
};

export const selectProjectsState = (state: RootState) => state.projects;
export const selectProject = (state: RootState, id: string) =>
  state.projects?.items?.find((p) => p.id === id);
export default projectsSlice.reducer;
