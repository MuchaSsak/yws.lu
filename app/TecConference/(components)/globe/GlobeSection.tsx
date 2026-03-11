"use client";

import { Globe } from "@/components/magicui/globe";
import useScroll from "@/hooks/useScroll";

function GlobeSection() {
  const { scrollY } = useScroll();

  const t = Math.min(Math.max(scrollY / 300, 0), 1);
  const scale = 1 + t * 0.3;

  return (
    <section className="xl:py-48 max-xl:py-32 relative px-side flex flex-col">
      {/* Flags */}

      {/* Globe */}
      <div style={{ transform: `translateY(${scale * 100}%) scale(${scale})` }}>
        <Globe className="absolute -top-16 -translate-y-1/2" />
      </div>
    </section>
  );
}

export default GlobeSection;
