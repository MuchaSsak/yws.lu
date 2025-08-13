import { type MotionProps } from "motion/react";

function motionFadeIn(delay = 0.25): MotionProps {
  return {
    initial: "hidden",
    whileInView: "visible",

    viewport: {
      once: true,
    },

    variants: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    },

    transition: {
      delay: delay,
      duration: 2,
    },
  };
}

export default motionFadeIn;
