import LightPillar from "@/components/ui/LightPillar";

function HeroBackground() {
  return (
    <div
      className="w-screen h-screen absolute -z-10 left-0 top-0 mask-b-from-10%"
      style={{ mixBlendMode: "exclusion" }}
    >
      <LightPillar
        topColor="#30C8FF"
        bottomColor="#1439FF"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.003}
        pillarWidth={5}
        pillarHeight={0.7}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        //   mixBlendMode="screen"
        quality="medium"
      />
    </div>
  );
}

export default HeroBackground;
