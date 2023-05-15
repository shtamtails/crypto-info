import { RefObject, useEffect } from "react";

/**
 *
 * Hook that listens for clicks outside a given component and calls a callback function when it happens
 * @param {React.RefObject<HTMLButtonElement | HTMLDivElement>} ref - Reference to the component being clicked outside of
 * @param {Function} callBack - Callback function to be called when a click outside of the component occurs
 * @returns {void}
 *
 */

export const useClickOutside = (
  ref: RefObject<HTMLButtonElement | HTMLDivElement>,
  callBack: () => void
) => {
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        callBack();
      }
    };
    document.addEventListener("mousedown", clickHandler);
    () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [ref, callBack]);
};
