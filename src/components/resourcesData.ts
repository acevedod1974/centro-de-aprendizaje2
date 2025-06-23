// Resource type definition for maintainability
export interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  size?: string;
  pages?: number;
  items?: number;
  duration?: string;
  updated: string;
  download_url?: string;
  view_url?: string;
}

// Remove hardcoded categories; will fetch from Supabase now
