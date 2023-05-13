import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<any>,
  parentElementRef: RefObject<any>,
  callBack: Function
) => {
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target &&
        !ref.current.contains(e.target) &&
        parentElementRef &&
        !parentElementRef.current.contains(e.target)
      ) {
        callBack();
      }
    };
    document.addEventListener("mousedown", clickHandler);
    () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [ref]);
};
