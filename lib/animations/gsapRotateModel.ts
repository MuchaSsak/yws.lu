import gsap from "gsap";

function gsapRotateModel(
  target: gsap.TweenTarget,
  scrollTriggerSelector: gsap.DOMTarget
) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: scrollTriggerSelector,
        start: "90% bottom",
      },
    })
    .fromTo(
      target,
      {
        y: -Math.PI * 4,
      },
      {
        y: -Math.PI * 6.2,
        duration: 2,
        ease: "expo.out",
      }
    );
}

export default gsapRotateModel;
