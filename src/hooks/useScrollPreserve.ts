import { useEffect, useRef } from "react";

// Hook to preserve scroll position
const useScrollPreservation = (): number => {
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    // Save the current scroll position when the component unmounts or changes
    const saveScrollPosition = () => {
      scrollYRef.current = window.scrollY;
    };

    // Restore the scroll position on component mount
    const restoreScrollPosition = () => {
      window.scrollTo(0, scrollYRef.current);
    };

    // Add event listeners to save and restore scroll position
    window.addEventListener("beforeunload", saveScrollPosition);
    window.addEventListener("popstate", restoreScrollPosition);

    return () => {
      // Clean up the event listeners
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.removeEventListener("popstate", restoreScrollPosition);
    };
  }, []);
  return scrollYRef.current;
};

export default useScrollPreservation;
