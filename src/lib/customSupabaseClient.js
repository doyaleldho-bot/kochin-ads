import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cmrwvcbovxecawspdmqg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcnd2Y2JvdnhlY2F3c3BkbXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MzkxMzQsImV4cCI6MjA4MjMxNTEzNH0.VEQlDY9PoAyBAqxJudecaok8H5oG_09QgjfiLrZ6WoE';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
