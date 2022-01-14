import { Issue, Project } from './graphql-types-generated';

export module IssueExt {
  export function toIssueInput(issue: Issue) {
    const { id, name, description, type, status } = issue;

    return {
      id,
      name,
      description,
      type,
      status,
    };
  }
}

export module ProjectExt {
  export function hasItems(project: Project) {
    return (project?.issuesConnection?.items as Issue[])?.length > 0 ?? false;
  }

  export function toProjectInput(project: Project) {
    const { id, name, abbreviation, description, color } = project;

    return {
      id,
      name,
      abbreviation,
      description,
      color,
    };
  }
}
