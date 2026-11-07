import { createClient } from '@supabase/supabase-js';

// Mengambil variabel dengan toleransi string kosong agar tidak memicu crash saat build server
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
