export interface Issue {
  id: string;
  name: string;
  type: 'BUG' | 'IMPROVEMENT' | 'STORY';
}
