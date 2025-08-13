import React from "react";
import { useThree } from "@react-three/fiber";
import { useWheel } from "@use-gesture/react";

const maxCameraZoom = 2;
const minCameraZoom = 1;

function ZoomController({ children }: { children: React.ReactNode }) {
  const { camera } = useThree();

  const bindWheel = useWheel((event) => {
    const isForward = event.direction[1] === -1;
    const isShiftKeyPressed = event.shiftKey;
    if (!isShiftKeyPressed) return;

    if (camera.zoom < maxCameraZoom && isForward) camera.zoom += 0.1;
    if (camera.zoom > minCameraZoom && !isForward) camera.zoom -= 0.1;
  });

  return <group {...bindWheel()}>{children}</group>;
}

export default ZoomController;
