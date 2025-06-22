import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jpozkwbusowbpyebqfaw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwb3prd2J1c293YnB5ZWJxZmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3ODYxOTYsImV4cCI6MjA1ODM2MjE5Nn0.V8wkWI-8WEDzIGNYDbT9zJIDoOwr-GMRW-Q9sOKW6mc";
export const supabase = createClient(supabaseUrl, supabaseKey);
