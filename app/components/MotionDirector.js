"use client";
import {useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export default function MotionDirector(){
 useEffect(()=>{
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  gsap.registerPlugin(ScrollTrigger);
  const ctx=gsap.context(()=>{
   gsap.utils.toArray("[data-motion-reveal]").forEach((section)=>{
    const children=section.querySelectorAll(".editorial-heading,.work-index-toolbar,.work-item,.work-principle,.capability-row,.process-story,.about-stamp,.about-content,.contact-content > *");
    gsap.fromTo(children,{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.8,stagger:.09,ease:"power3.out",clearProps:"transform",scrollTrigger:{trigger:section,start:"top 78%",once:true}});
   });
   gsap.utils.toArray(".work-artwork").forEach((art)=>{
    const visual=art;
    gsap.fromTo(visual,{clipPath:"inset(0 0 12% 0)",y:20},{clipPath:"inset(0 0 0% 0)",y:0,duration:1.05,ease:"power3.out",scrollTrigger:{trigger:visual,start:"top 88%",once:true}});
   });
   gsap.utils.toArray(".capability-row").forEach((row)=>{
    const number=row.querySelector(".capability-number");
    gsap.fromTo(number,{color:"#ff4966"},{color:"#8aa4ae",duration:.5,scrollTrigger:{trigger:row,start:"top 86%",once:true}});
   });
   gsap.to(".contact-gridlines",{backgroundPosition:"0 120px, 120px 0, center",ease:"none",scrollTrigger:{trigger:".contact-section",start:"top bottom",end:"bottom top",scrub:.5}});
  });
  return()=>ctx.revert();
 },[]);
 return null;
}