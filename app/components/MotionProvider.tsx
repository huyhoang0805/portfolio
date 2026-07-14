"use client";
import { MotionConfig } from "framer-motion";

export interface MotionProviderProps {
  children: React.ReactNode;
}

/** Tôn trọng OS Reduced Motion: tự tắt transform/layout animation, giữ opacity. */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
