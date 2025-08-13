import { useEffect } from "react";
import { toast } from "sonner";

import { isMobile } from "@/lib/utils";

function useResizeWarning() {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);

      if (isMobile()) return; // Mobile devices have an issue where they trigger `resize` on scroll

      timeoutId = setTimeout(() => {
        toast.warning(
          "You've resized the window. If you encounter visual issues, please refresh the site 🙏",
          { duration: 3_000, closeButton: true }
        );
      }, 1_000);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
}

export default useResizeWarning;
