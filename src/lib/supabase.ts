import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://hzrxmqzwnggpfmbvjwng.supabase.co"
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        persistSession: true
    }
})
