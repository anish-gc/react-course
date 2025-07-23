import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() ===  key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", action);

      return function () {
        document.removeEventListener("keydown", action);
      };
    },
    [action, key]
  );
}
