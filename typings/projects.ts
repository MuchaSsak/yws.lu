export type ProjectInDB = {
  id: string;
  created_at: string;
  title: string;
  thumbnail_id: string;
  authors: string[];
  description: string;
  started_at: string;
  ended_at?: string;
  links: string[];
};
