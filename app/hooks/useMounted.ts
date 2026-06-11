"use client";
import { useSyncExternalStore } from "react";

/**
 * Returns false on the server (SSR), true on the client (after hydration).
 * Uses useSyncExternalStore to avoid setState-in-effect linter errors.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},  // subscribe: noop (state never changes externally)
    () => true,      // getSnapshot: client always "mounted"
    () => false      // getServerSnapshot: server always "not mounted"
  );
}
