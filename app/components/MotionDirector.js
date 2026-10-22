"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function MotionDirector() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis;
    let rafId = 0;
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => document.documentElement.style.setProperty("--scroll-progress", self.progress.toFixed(4)),
      });
      if (!reduced) {
        lenis = new Lenis({
          duration: 1.08,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.88,
          touchMultiplier: 1.05,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time) => {
          lenis?.raf(time * 1000);
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        gsap.ticker.lagSmoothing(0);
      }

      gsap.utils.toArray("[data-motion-reveal]").forEach((section) => {
        const items = section.querySelectorAll(".section-topline, .work-intro, .rethink-project, .work-footnote, .method-intro, .method-steps article, .profile-monogram, .profile-copy > *, .contact-inner > *");
        gsap.fromTo(items, { autoAlpha: 0, y: reduced ? 0 : 32 }, {
          autoAlpha: 1, y: 0, duration: reduced ? 0.01 : 0.82, stagger: reduced ? 0 : 0.085, ease: "power3.out",
          clearProps: "transform", scrollTrigger: { trigger: section, start: "top 80%", once: true }
        });
      });

      gsap.utils.toArray(".project-visual").forEach((visual, index) => {
        if (!reduced) {
          gsap.fromTo(visual, { clipPath: "inset(0 0 12% 0)", y: 22 }, {
            clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: visual, start: "top 92%", once: true }
          });
          gsap.to(visual.querySelector(".visual-index"), {
            y: index % 2 === 0 ? -16 : 12, ease: "none",
            scrollTrigger: { trigger: visual, start: "top bottom", end: "bottom top", scrub: 0.7 }
          });
        }
      });

      gsap.utils.toArray(".method-steps article").forEach((item) => {
        gsap.fromTo(item.querySelector("span"), { scale: reduced ? 1 : 0.75, opacity: reduced ? 1 : 0.25 }, {
          scale: 1, opacity: 1, duration: reduced ? 0.01 : 0.55, ease: "back.out(1.7)",
          scrollTrigger: { trigger: item, start: "top 88%", once: true }
        });
      });

      if (!reduced) {
        gsap.to(".rethink-marquee div", { xPercent: -18, ease: "none", scrollTrigger: {
          trigger: ".rethink-marquee", start: "top bottom", end: "bottom top", scrub: 0.6
        }});
        gsap.to(".profile-monogram > span", { y: -24, ease: "none", scrollTrigger: {
          trigger: ".rethink-profile", start: "top bottom", end: "bottom top", scrub: 0.7
        }});
        gsap.to(".cinematic-canvas", { yPercent: 12, scale: 1.06, ease: "none", scrollTrigger: {
          trigger: ".cinematic-hero", start: "top top", end: "bottom top", scrub: 0.8
        }});
        gsap.to(".hero-figure-caption", { y: -48, ease: "none", scrollTrigger: {
          trigger: ".cinematic-hero", start: "top top", end: "bottom top", scrub: 0.7
        }});
        gsap.to(".hero-grain", { opacity: 0.025, ease: "none", scrollTrigger: {
          trigger: ".cinematic-hero", start: "top top", end: "bottom top", scrub: 0.6
        }});
        gsap.utils.toArray(".rethink-project").forEach((card, index) => {
          const visual = card.querySelector(".project-visual");
          if (!visual) return;
          gsap.to(visual, { yPercent: index % 2 ? -3 : 3, ease: "none", scrollTrigger: {
            trigger: card, start: "top bottom", end: "bottom top", scrub: 0.8
          }});
        });
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      context.revert();
    };
  }, []);
  return null;
}
