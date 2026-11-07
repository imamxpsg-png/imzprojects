import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Objek ini yang diekspor dan dipanggil oleh halaman Tutorial, Store, dan Admin
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
