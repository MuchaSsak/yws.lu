// @ts-nocheck
import ColorBends from "@/components/ui/ColorBends";

function HeroBackground() {
  return (
    <div className="absolute w-screen h-screen left-0 top-0 bg-blend-lighten  mask-b-from-10% -z-10">
      <ColorBends
        rotation={45}
        speed={0.2}
        colors={["#FF7373", "#F0FFC2", "#FF990A"]}
        transparent
        autoRotate={0}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
      />
    </div>
  );
}

export default HeroBackground;
