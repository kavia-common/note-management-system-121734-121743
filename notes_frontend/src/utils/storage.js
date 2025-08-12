const PREFIX = "notesapp_v1";

/**
 * PUBLIC_INTERFACE
 * storageGet
 * Safely gets and parses JSON from localStorage.
 */
export function storageGet(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(`${PREFIX}:${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * PUBLIC_INTERFACE
 * storageSet
 * Safely stringifies and saves JSON to localStorage.
 */
export function storageSet(key, value) {
  try {
    window.localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
  } catch {
    // ignore write failures
  }
}

/**
 * PUBLIC_INTERFACE
 * storageRemove
 * Removes a key from localStorage.
 */
export function storageRemove(key) {
  try {
    window.localStorage.removeItem(`${PREFIX}:${key}`);
  } catch {
    // ignore remove failures
  }
}
