export interface Issue {
  id: string;
  name: string;
  description: string;
  type: 'TASK' | 'BUG' | 'IMPROVEMENT' | 'STORY';
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';
  updated: string;
  lastStatusChange: string;
}

export module Issue {
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
