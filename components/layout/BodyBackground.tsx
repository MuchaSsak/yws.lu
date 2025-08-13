import React from "react";

function BodyBackground() {
  return (
    <div className="top-0 left-0 pointer-events-none fixed z-[-4] flex min-h-screen w-screen justify-center">
      {/* Vignette */}
      <div className="absolute top-0 z-[-3] size-full content-[''] [background:radial-gradient(circle,rgba(2,0,36,0)0,#fafafa_100%)]" />
      {/* Grid */}
      <div className="absolute top-0 z-[-4] size-full bg-[url('/images/grid.svg')] opacity-50 invert content-['']" />
      {/* Radial gradient */}
      <div className="absolute top-20 z-[-2] size-full bg-[radial-gradient(at_27%_37%,hsla(215,98%,61%,1)_0px,transparent_0%),radial-gradient(at_97%_21%,hsla(125,98%,72%,1)_0px,transparent_50%),radial-gradient(at_52%_99%,_hsla(354,98%,61%,1)_0px,_transparent_50%),radial-gradient(at_10%_29%,hsla(256,96%,67%,1)_0px,transparent_50%),radial-gradient(at_97%_96%,hsla(38,60%,74%,1)_0px,transparent_50%),radial-gradient(at_33%_50%,hsla(222,67%,73%,1)_0px,transparent_50%),radial-gradient(at_79%_53%,hsla(343,68%,79%,1)_0px,transparent_50%)] opacity-25 blur-[6.25rem] saturate-150 xl:w-1/2" />
    </div>
  );
}

export default BodyBackground;
