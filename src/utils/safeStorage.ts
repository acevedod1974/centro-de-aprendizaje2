// src/utils/safeStorage.ts

export function safeLocalStorage() {
  try {
    const testKey = "__test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function safeSetItem(key: string, value: string) {
  try {
    const storage = safeLocalStorage();
    if (storage) storage.setItem(key, value);
  } catch {}
}

export function safeGetItem(key: string): string | null {
  try {
    const storage = safeLocalStorage();
    if (storage) return storage.getItem(key);
  } catch {}
  return null;
}
