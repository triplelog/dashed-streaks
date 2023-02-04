import { createClient } from "@pankod/refine-supabase";

const SUPABASE_URL = "https://soezvtjifizhiooyqclt.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZXp2dGppZml6aGlvb3lxY2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU1MzI4MTQsImV4cCI6MTk5MTEwODgxNH0.4dFh1-o_1WuN37JcNEJFjS6iAZrLE4pylMpj9-kU3bs";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
