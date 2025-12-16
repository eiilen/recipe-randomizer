import { useSyncExternalStore } from "react";

let muted = localStorage.getItem("muted") === "true";
const listeners = new Set<() => void>();

const emit = () => listeners.forEach(l => l());

export function toggleMute() {
  muted = !muted;
  localStorage.setItem("muted", String(muted));
  emit();
}

export function useMute() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => muted
  );
}
