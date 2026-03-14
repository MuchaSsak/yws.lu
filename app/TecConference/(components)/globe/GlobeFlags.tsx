// @ts-nocheck
import Folder from "@/components/ui/Folder";
import { notoColorEmoji } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

function GlobeFlags({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("relative z-50", className)} {...props}>
      <Folder
        size={1.5}
        color="#ffb900"
        className="custom-folder scale-150 absolute left-1/2 -translate-x-1/2 -translate-y-8 animate-aurora-sm"
        items={[
          <span className={cn("text-5xl", notoColorEmoji.className)}>🇮🇹</span>,
          <span className={cn("text-5xl", notoColorEmoji.className)}>🇩🇪</span>,
          <span className={cn("text-5xl", notoColorEmoji.className)}>🇱🇺</span>,
        ]}
        titles={["Italy", "Germany", "Luxembourg"]}
      />
    </div>
  );
}

export default GlobeFlags;
