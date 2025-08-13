import gsap from "gsap";

function gsapFadeInFromBottom(
  target: gsap.TweenTarget,
  scrollTriggerSelector: gsap.DOMTarget
) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: scrollTriggerSelector,
        start: "15% bottom",
        end: "40% bottom",
        scrub: true,
      },
    })
    .fromTo(
      target,
      {
        y: 20,
        opacity: 0,
        filter: "blur(0.25rem)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0rem)",
      }
    );
}

export default gsapFadeInFromBottom;
