import { useEffect, useState } from "react";

export default function useTimeout(timeout?: number) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        setText("i am here");
      }, timeout);
    }
  }, [timeout]);

  return { text };
}
