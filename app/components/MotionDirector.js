"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionDirector() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray("[data-motion-reveal]").forEach((section) => {
        const items = section.querySelectorAll(".section-topline, .work-intro, .rethink-project, .work-footnote, .method-intro, .method-steps article, .profile-monogram, .profile-copy > *, .contact-inner > *");
        gsap.fromTo(items, { autoAlpha: 0, y: 26 }, {
          autoAlpha: 1, y: 0, duration: 0.78, stagger: 0.075, ease: "power3.out",
          clearProps: "transform", scrollTrigger: { trigger: section, start: "top 78%", once: true }
        });
      });
      gsap.utils.toArray(".project-visual").forEach((visual) => {
        gsap.fromTo(visual, { clipPath: "inset(0 0 10% 0)", y: 14 }, {
          clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: visual, start: "top 90%", once: true }
        });
      });
      gsap.utils.toArray(".method-steps article").forEach((item) => {
        gsap.fromTo(item.querySelector("span"), { scale: 0.75, opacity: 0.25 }, {
          scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.7)",
          scrollTrigger: { trigger: item, start: "top 88%", once: true }
        });
      });
      gsap.to(".rethink-marquee div", { xPercent: -12, ease: "none", scrollTrigger: {
        trigger: ".rethink-marquee", start: "top bottom", end: "bottom top", scrub: 0.5
      }});
      gsap.to(".profile-monogram > span", { y: -12, ease: "none", scrollTrigger: {
        trigger: ".rethink-profile", start: "top bottom", end: "bottom top", scrub: 0.6
      }});
    });
    return () => context.revert();
  }, []);
  return null;
}
