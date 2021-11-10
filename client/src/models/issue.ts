export interface Issue {
  id: string;
  name: string;
  description: string;
  type: 'TASK' | 'BUG' | 'IMPROVEMENT' | 'STORY';
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';
  updated: string;
  lastStatusChange: string;
}
