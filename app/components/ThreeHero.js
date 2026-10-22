"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function ThreeHero() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090506, 0.055);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 0, 9);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const sculpture = new THREE.Group();
    sculpture.position.set(-1.5, 0.05, 0);
    scene.add(sculpture);

    const porcelain = new THREE.MeshPhysicalMaterial({ color: 0xe1d9d6, metalness: 0.68, roughness: 0.2, clearcoat: 0.95, clearcoatRoughness: 0.12 });
    const graphite = new THREE.MeshStandardMaterial({ color: 0x171315, metalness: 0.9, roughness: 0.2 });
    const amber = new THREE.MeshPhysicalMaterial({ color: 0xff4938, emissive: 0x8f0712, emissiveIntensity: 0.9, metalness: 0.42, roughness: 0.16, transmission: 0.05 });
    const wire = new THREE.MeshBasicMaterial({ color: 0xff4938, wireframe: true, transparent: true, opacity: 0.18 });

    const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.24, 0), porcelain);
    core.rotation.set(0.2, 0.4, 0.1);
    sculpture.add(core);

    const shell = new THREE.Mesh(new THREE.OctahedronGeometry(1.72, 0), wire);
    sculpture.add(shell);

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.026, 4, 6), amber);
    ringA.rotation.set(0.9, 0.2, 0.35);
    sculpture.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.022, 4, 6), graphite);
    ringB.rotation.set(0.2, 1.1, 0.75);
    sculpture.add(ringB);

    const blockA = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.62, 0.62), graphite);
    blockA.position.set(-1.8, 0.7, 0.4);
    blockA.rotation.set(0.5, 0.2, 0.6);
    sculpture.add(blockA);
    const blockB = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.35), amber);
    blockB.position.set(1.65, -0.65, 0.25);
    blockB.rotation.z = -0.4;
    sculpture.add(blockB);

    const pointCount = window.innerWidth < 700 ? 240 : 520;
    const positions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xf4d9d4, size: 0.014, transparent: true, opacity: 0.58 }));
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xb0a09a, 1.35));
    const keyLight = new THREE.DirectionalLight(0xffe5d8, 4.0);
    keyLight.position.set(3, 5, 5);
    scene.add(keyLight);
    const limeLight = new THREE.PointLight(0xff3025, 24, 12);
    limeLight.position.set(-3, 0.5, 3);
    scene.add(limeLight);
    const rimLight = new THREE.PointLight(0xff7a42, 10, 12);
    rimLight.position.set(1, -3, -2);
    scene.add(rimLight);

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let elapsed = 0;
    const onPointer = (event) => {
      const bounds = root.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.38;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.24;
    };
    const resize = () => {
      const width = Math.max(root.clientWidth, 1);
      const height = Math.max(root.clientHeight, 1);
      camera.aspect = width / height;
      camera.position.z = width < 700 ? 10.8 : 8.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      sculpture.position.x = width < 700 ? -0.1 : -1.55;
      sculpture.scale.setScalar(width < 700 ? 0.58 : 1.02);
    };
    const render = () => {
      elapsed += 0.008;
      if (!reduceMotion) {
        currentX += (pointerY - currentX) * 0.035;
        currentY += (pointerX - currentY) * 0.035;
        sculpture.rotation.x = currentX + Math.sin(elapsed * 0.4) * 0.035;
        sculpture.rotation.y = currentY + elapsed * 0.055;
        core.rotation.y += 0.0015;
        shell.rotation.x -= 0.001;
        ringA.rotation.z += 0.0018;
        ringB.rotation.x -= 0.0012;
        blockA.rotation.y += 0.002;
        particles.rotation.y = Math.sin(elapsed * 0.12) * 0.06;
        limeLight.intensity = 22 + Math.sin(elapsed * 1.4) * 3;
      }
      renderer.render(scene, camera);
      if (!reduceMotion) frame = window.requestAnimationFrame(render);
    };

    resize();
    render();
    if (!reduceMotion) root.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", resize);
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.fromTo(".hero-eyebrow, .hero-copy, .hero-bottomline", { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.12, ease: "power3.out", delay: 0.18 });
        gsap.fromTo(".hero-title-line span", { yPercent: 115, rotateX: -14 }, { yPercent: 0, rotateX: 0, duration: 1.05, stagger: 0.12, ease: "power4.out", delay: 0.12 });
        gsap.fromTo(".hero-figure-caption", { autoAlpha: 0, x: 12 }, { autoAlpha: 1, x: 0, duration: 0.7, delay: 0.9 });
        gsap.to(".hero-figure-crosshair", { rotate: 90, duration: 16, repeat: -1, ease: "none" });
      }
    }, root);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      ctx.revert();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, []);

  return <section className="cinematic-hero" id="home" ref={rootRef} aria-labelledby="hero-title">
    <canvas ref={canvasRef} className="cinematic-canvas" aria-hidden="true" />
    <div className="hero-grain" aria-hidden="true" />
    <div className="hero-art-frame" aria-hidden="true"><span>FIG. 001 / SYSTEM FORM</span><i/><b/></div>
    <div className="hero-vertical-index" aria-hidden="true"><span>MT—001</span><i /><span>DESIGN / SYSTEMS</span></div>
    <div className="hero-identity"><span>ABDUL MALICK TM</span><small>PRODUCT DESIGNER / UX SYSTEMS / WEB</small></div>
    <div className="hero-coordinates"><span>12.9716° N</span><span>77.5946° E</span><small>BENGALURU / INDIA</small></div>
    <div className="hero-copy-wrap">
      <p className="hero-eyebrow"><i /> INDEPENDENT PRODUCT DESIGNER <span>·</span> BENGALURU, INDIA</p>
      <p className="hero-japanese" aria-label="Designing with intent">設計 / 意図 / 明瞭さ</p>
      <h1 id="hero-title"><span className="hero-title-line"><span>DESIGN</span></span><span className="hero-title-line"><span>BEYOND</span></span><span className="hero-title-line hero-title-accent"><span>ORDINARY<span className="hero-period">.</span></span></span></h1>
      <p className="hero-copy">I design digital products, interfaces and brand experiences that turn complexity into clarity.</p>
      <div className="hero-bottomline"><a href="#work" className="hero-primary-link">VIEW SELECTED WORK <span>↗</span></a><a href="#about" className="hero-play-link"><i/> EXPLORE THE DESIGNER</a></div>
    </div>
    <div className="hero-target" aria-hidden="true"><i/><span>DESIGN SIGNAL / LOCKED</span></div>
    <div className="hero-status-panel"><div className="hero-status-head"><span>SYSTEM STATUS</span><span>LIVE / 001</span></div><p><span>VISUAL SYSTEMS</span><b>ONLINE</b></p><p><span>INTERACTION ENGINE</span><b>ACTIVE</b></p><p><span>PORTFOLIO DATA</span><b>LOADED</b></p><p><span>DESIGN PROCESS</span><b>READY</b></p><div className="hero-status-meter"><i/></div><small>WELCOME / OPERATOR<br/>:: EXPLORE MY WORLD</small></div>
    <div className="hero-figure-caption"><span className="hero-figure-crosshair">✳</span><span>STUDY 001<br/>FORM / SYSTEM / SIGNAL</span></div>
    <div className="hero-bottom-rule"><span>01 — 04</span><span>SCROLL TO EXPLORE</span><span>© MALICK / 2026</span></div>
  </section>;
}
