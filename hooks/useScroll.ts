import { useEffect, useState } from "react";

function useScroll() {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScroll({ y: window.scrollY, x: window.scrollX });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollX: scroll.x, scrollY: scroll.y };
}

export default useScroll;
