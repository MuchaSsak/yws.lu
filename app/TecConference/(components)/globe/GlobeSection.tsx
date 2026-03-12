"use client";

import GlobeFlags from "@/app/TecConference/(components)/globe/GlobeFlags";
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
      <div className="relative">
        <div style={{ transform: `scale(${scale})` }}>
          <Globe className="absolute top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-4 flex-row justify-betweem">
          <div className="flex-1">
            <p className="text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
              eveniet mollitia excepturi deleniti modi quod consequatur nostrum
              ab architecto accusamus ad, optio laboriosam quidem repellat
              maxime facilis dicta perspiciatis eligendi.
            </p>
          </div>

          <GlobeFlags
            className="flex-1"
            style={{ transform: `scale(${scale})` }}
          />

          <div className="flex-1">
            <p className="text-right text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
              eveniet mollitia excepturi deleniti modi quod consequatur nostrum
              ab architecto accusamus ad, optio laboriosam quidem repellat
              maxime facilis dicta perspiciatis eligendi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobeSection;
