"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeHero() {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05080d, 0.055);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    const group = new THREE.Group();
    scene.add(group);

    const chrome = new THREE.MeshStandardMaterial({
      color: 0x91f6ff, metalness: 0.96, roughness: 0.19,
      emissive: 0x062a36, emissiveIntensity: 0.65,
    });
    const blade = new THREE.Mesh(new THREE.TorusKnotGeometry(1.05, 0.28, 220, 24, 2, 5), chrome);
    group.add(blade);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.23 });
    const ring = new THREE.Mesh(new THREE.IcosahedronGeometry(1.85, 2), ringMaterial);
    group.add(ring);
    const redRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.009, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0xff365d, transparent: true, opacity: 0.8 })
    );
    redRing.rotation.set(1.05, 0.3, 0.2);
    group.add(redRing);

    const particleCount = window.innerWidth < 700 ? 450 : 900;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x72dce8, size: 0.012, transparent: true, opacity: 0.7, sizeAttenuation: true })
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0x829cae, 1.4));
    const keyLight = new THREE.DirectionalLight(0xe9ffff, 4.5);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const redLight = new THREE.PointLight(0xff234f, 30, 12);
    redLight.position.set(-3, -1, 2);
    scene.add(redLight);
    const cyanLight = new THREE.PointLight(0x00c8ff, 35, 12);
    cyanLight.position.set(2, 2, 1);
    scene.add(cyanLight);

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    const onPointer = (event) => {
      const rect = root.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.65;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.45;
    };
    const resize = () => {
      const width = Math.max(root.clientWidth, 1);
      const height = Math.max(root.clientHeight, 1);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 9.5 : 8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const render = () => {
      frame += 0.006;
      if (!reduceMotion) {
        group.rotation.y += (targetX - group.rotation.y) * 0.025;
        group.rotation.x += (-targetY - group.rotation.x) * 0.025;
        blade.rotation.z += 0.003;
        ring.rotation.y -= 0.0015;
        ring.rotation.x += 0.001;
        redRing.rotation.z += 0.0018;
        particles.rotation.y = Math.sin(frame * 0.18) * 0.025;
        group.position.y = Math.sin(frame) * 0.06;
      }
      renderer.render(scene, camera);
      if (!reduceMotion) raf = window.requestAnimationFrame(render);
    };
    let raf = 0;
    resize();
    render();
    if (!reduceMotion) root.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", resize);

    const letters = root.querySelectorAll("[data-metal-letter]");
    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (!reduceMotion) {
      gsap.set(letters, { yPercent: 125, rotateX: -80, opacity: 0 });
      intro.to(letters, { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.9, stagger: 0.045, delay: 0.12 })
        .fromTo(root.querySelector(".hero-kicker"), { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.45")
        .fromTo(root.querySelector(".hero-description"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3")
        .fromTo(root.querySelectorAll(".hero-action, .hero-hud"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09 }, "-=0.2");
      gsap.to(root.querySelector(".hero-scan"), { xPercent: 120, duration: 1.5, ease: "power2.inOut", repeat: -1, repeatDelay: 3.4 });
      gsap.utils.toArray("[data-motion-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 32, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    } else {
      gsap.set(letters, { yPercent: 0, rotateX: 0, opacity: 1 });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      root.removeEventListener("pointermove", onPointer);
      intro.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      scene.traverse((item) => {
        if (item.geometry) item.geometry.dispose();
        if (item.material) {
          const materials = Array.isArray(item.material) ? item.material : [item.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  const name = "MALICK";
  return (
    <section className="three-hero" ref={rootRef} aria-labelledby="hero-title">
      <canvas className="three-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />
      <div className="hero-vertical-code" aria-hidden="true">MT—001<br />DESIGN / SYSTEMS / FUTURE</div>
      <div className="three-hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="hero-live-dot" /> INDEPENDENT DESIGNER <i> / </i> BENGALURU, INDIA</div>
          <div className="metal-wordmark" aria-label="Malick">
            {name.split("").map((letter, index) => (
              <span className="metal-letter-mask" key={letter + index}><span data-metal-letter>{letter}</span></span>
            ))}
            <span className="wordmark-cut" aria-hidden="true" />
          </div>
          <div className="hero-title-lockup">
            <span className="hero-index">PRODUCT DESIGNER × UX ENGINEER</span>
            <h1 id="hero-title">DESIGN <span className="slash-mark">/</span><br /><em>REFORGED.</em></h1>
          </div>
          <p className="hero-description">I turn complex products into sharp, human-centred experiences — merging product thinking, interaction design and code into one seamless system.</p>
          <div className="hero-actions-row">
            <a className="hero-action hero-action-primary" href="#work">ENTER THE WORK <span>↘</span></a>
            <a className="hero-action hero-action-secondary" href="mailto:hello@mhdesign4u.com?subject=Portfolio%20enquiry">START A PROJECT <span>↗</span></a>
          </div>
          <div className="hero-hud">
            <div><span>EXPERIENCE</span><b>07<span>+</span> YEARS</b></div>
            <div><span>FOCUS</span><b>PRODUCT / SAAS / WEB</b></div>
            <div><span>MODE</span><b className="hud-online">SYSTEM ONLINE</b></div>
          </div>
        </div>
        <div className="hero-3d-caption" aria-hidden="true"><span>FIG. 001</span><span>FORM / FORCE / FUNCTION</span></div>
      </div>
      <a className="hero-scroll-cue" href="#work" aria-label="Scroll to selected work"><span>SCROLL TO EXPLORE</span><i /></a>
    </section>
  );
}
