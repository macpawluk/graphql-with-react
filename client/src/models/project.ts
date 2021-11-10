import { Issue } from './issue';

export interface Project {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  color: string;
  updated: string;
  issuesConnection: {
    totalCount: number;
    items: Issue[];
  };
}

export module Project {
  export function hasItems(project: Project) {
    return project?.issuesConnection?.items?.length > 0 ?? false;
  }
}
