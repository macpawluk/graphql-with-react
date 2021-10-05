import { Project } from './../../models';
import { graphQlFetch } from './../../utils/graphQl';

const queryAll = `
    query projectsQuery {
      projects {
          id,
          name,
          abbreviation,
          description,
          color,
          issuesConnection(first: 10) {
              totalCount,
          }
      }
    }
`;

export async function fetchAllProjects(): Promise<Project[]> {
  const result = await graphQlFetch<{ projects: Project[] }>(queryAll);
  return result.projects;
}

const querySingle = (id: string) => `
    query projectQuery {    
      project(id: "${id}") {
        id,
        name,
        abbreviation,
        description,
        color,
        issuesConnection(first: 1000) {
            totalCount,
            pageInfo {
                endCursor,
                hasNextPage
            },
            items {
                id,
                name,
                type
            }
        }
      }
    }
`;

export async function fetchProjectDetails(id: string): Promise<Project> {
  const result = await graphQlFetch<{ project: Project }>(querySingle(id));
  return result.project;
}
