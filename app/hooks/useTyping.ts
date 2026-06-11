"use client";
import { useState, useEffect } from "react";

/**
 * Typing animation hook.
 * @param words  - danh sách từ sẽ được gõ lần lượt
 * @param speed  - tốc độ gõ (ms/ký tự), mặc định 90
 * @param pause  - thời gian dừng sau khi gõ xong (ms), mặc định 1800
 */
export function useTyping(words: string[], speed = 90, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;

    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), pause);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return text;
}
