const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

/**
 * PUBLIC_INTERFACE
 * getSupabase
 * Attempts to dynamically import and initialize a Supabase client only when
 * environment variables are present and the SDK is installed. If anything fails,
 * returns null and logs a warning so the app can continue in offline mode.
 */
export async function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.info(
      "[Supabase] REACT_APP_SUPABASE_URL/REACT_APP_SUPABASE_KEY not set - offline/local mode."
    );
    return null;
  }
  try {
    // Dynamic import prevents build errors when @supabase/supabase-js isn't installed yet.
    // It will only be required when env vars exist.
    // eslint-disable-next-line no-undef
    const mod = await import(/* webpackIgnore: true */ "@supabase/supabase-js").catch(() => null);
    if (!mod || !mod.createClient) {
      console.warn(
        "[Supabase] SDK not installed or failed to load. Run: npm install @supabase/supabase-js"
      );
      return null;
    }
    const client = mod.createClient(SUPABASE_URL, SUPABASE_KEY);
    return client;
  } catch (e) {
    console.warn("[Supabase] Failed to initialize client, using offline mode.", e);
    return null;
  }
}
