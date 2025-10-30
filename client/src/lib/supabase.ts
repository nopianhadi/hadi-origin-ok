import { createClient } from '@supabase/supabase-js'
import { logger } from './logger'
import { validateEnvVars } from './security'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const { isValid, missing } = validateEnvVars();

if (!isValid) {
  logger.error('❌ Missing Supabase environment variables:', missing);
  throw new Error('Missing required environment variables')
}

logger.log('✅ Supabase client initialized');

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
