import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pqnwsolgkiijwbtsqxjr.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxbndzb2xna2lpandidHNxeGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4OTI4NjYsImV4cCI6MjA2MjQ2ODg2Nn0.Woze8IwlU7DzzL2FBoG8ZL-yx4B0-cZU4drep3J0ufE"

export const supabase = createClient(supabaseUrl, supabaseKey)
