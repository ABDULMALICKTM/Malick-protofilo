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
    scene.fog = new THREE.FogExp2(0x02060d, 0.035);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.55;

    const world = new THREE.Group();
    world.position.set(1.55, -0.05, 0);
    scene.add(world);

    const steel = new THREE.MeshStandardMaterial({ color: 0x8daab8, metalness: 1, roughness: 0.17, emissive: 0x062a40, emissiveIntensity: 0.7 });
    const edgeSteel = new THREE.MeshStandardMaterial({ color: 0xe9ffff, metalness: 0.94, roughness: 0.12, emissive: 0x2ce5ff, emissiveIntensity: 0.55 });
    const darkSteel = new THREE.MeshStandardMaterial({ color: 0x101923, metalness: 0.95, roughness: 0.3 });
    const redMaterial = new THREE.MeshStandardMaterial({ color: 0x6d1023, metalness: 0.8, roughness: 0.22, emissive: 0x4d0015, emissiveIntensity: 1.3 });
    const cyanMaterial = new THREE.MeshBasicMaterial({ color: 0x46efff });

    // Sculpted abstract energy blade: original geometry, not game artwork.
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(-0.34, -2.45);
    bladeShape.lineTo(-0.2, 0.9);
    bladeShape.lineTo(-0.06, 2.85);
    bladeShape.lineTo(0.04, 3.28);
    bladeShape.lineTo(0.16, 2.9);
    bladeShape.lineTo(0.39, 0.95);
    bladeShape.lineTo(0.32, -2.45);
    bladeShape.lineTo(0.02, -2.68);
    bladeShape.closePath();
    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, { depth: 0.12, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.055, bevelThickness: 0.05 });
    bladeGeo.computeVertexNormals();
    const blade = new THREE.Mesh(bladeGeo, steel);
    blade.position.set(0.15, 0.2, 0.05);
    blade.rotation.z = -0.23;
    world.add(blade);

    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.035, 4.95, 0.035), edgeSteel);
    edge.position.set(0.45, 0.28, 0.19);
    edge.rotation.z = -0.23;
    world.add(edge);

    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.065, 4.2, 0.045), darkSteel);
    spine.position.set(-0.03, 0.25, 0.2);
    spine.rotation.z = -0.23;
    world.add(spine);

    const guard = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.18, 0.32), darkSteel);
    guard.position.set(0.05, -2.35, 0.22);
    guard.rotation.z = -0.08;
    world.add(guard);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.14, 1.25, 12), darkSteel);
    handle.position.set(-0.04, -3.05, 0.2);
    handle.rotation.z = -0.03;
    world.add(handle);
    const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), redMaterial);
    pommel.position.set(-0.04, -3.72, 0.2);
    world.add(pommel);

    // Holographic targeting lens with concentric rotating rings.
    const lens = new THREE.Group();
    lens.position.set(-1.0, 0.25, -0.9);
    world.add(lens);
    const lensCore = new THREE.Mesh(new THREE.SphereGeometry(0.46, 32, 20), new THREE.MeshBasicMaterial({ color: 0x063a5d, transparent: true, opacity: 0.7 }));
    lens.add(lensCore);
    const iris = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.025, 8, 100), cyanMaterial);
    lens.add(iris);
    const irisInner = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.012, 6, 80), new THREE.MeshBasicMaterial({ color: 0x91faff, transparent: true, opacity: 0.8 }));
    lens.add(irisInner);
    const reticle = new THREE.Mesh(new THREE.RingGeometry(0.72, 0.74, 96), new THREE.MeshBasicMaterial({ color: 0x1aa8d9, transparent: true, opacity: 0.7, side: THREE.DoubleSide }));
    lens.add(reticle);

    const sparksCount = window.innerWidth < 700 ? 380 : 850;
    const sparkPositions = new Float32Array(sparksCount * 3);
    const sparkVelocities = [];
    for (let i = 0; i < sparksCount; i++) {
      sparkPositions[i * 3] = (Math.random() - 0.5) * 11;
      sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      sparkVelocities.push((Math.random() * 0.003) + 0.0007);
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    const sparks = new THREE.Points(sparkGeo, new THREE.PointsMaterial({ color: 0x9aefff, size: 0.018, transparent: true, opacity: 0.8, sizeAttenuation: true }));
    scene.add(sparks);

    // Electrical filaments flicker along the blade.
    const arcs = [];
    for (let a = 0; a < 5; a++) {
      const points = [];
      const y = -1.8 + a * 0.9;
      for (let i = 0; i < 18; i++) points.push(new THREE.Vector3(0.2 + (Math.random() - 0.5) * 0.45, y + i * 0.075, 0.28 + (Math.random() - 0.5) * 0.12));
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const arc = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: a % 2 ? 0x56eaff : 0x9ffaff, transparent: true, opacity: 0.0 }));
      world.add(arc);
      arcs.push(arc);
    }

    scene.add(new THREE.AmbientLight(0x7796ad, 1.15));
    const key = new THREE.DirectionalLight(0xe6faff, 5.5);
    key.position.set(3, 5, 5);
    scene.add(key);
    const cyan = new THREE.PointLight(0x00bfff, 48, 15);
    cyan.position.set(2, 1.2, 3);
    scene.add(cyan);
    const red = new THREE.PointLight(0xff1f4c, 32, 10);
    red.position.set(-2.8, -1.8, 1.5);
    scene.add(red);
    const back = new THREE.PointLight(0x527dff, 35, 14);
    back.position.set(0.5, 4, -2);
    scene.add(back);

    let raf = 0;
    let elapsed = 0;
    let targetX = 0;
    let targetY = 0;
    const pointer = (event) => {
      const rect = root.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 0.3;
      targetY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 0.2;
    };
    const resize = () => {
      const width = Math.max(root.clientWidth, 1);
      const height = Math.max(root.clientHeight, 1);
      camera.aspect = width / height;
      camera.position.z = width < 650 ? 11.5 : 9.4;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      world.position.x = width < 650 ? 0.45 : 1.7;
      world.scale.setScalar(width < 650 ? 0.73 : 0.95);
    };
    const render = () => {
      elapsed += 0.012;
      if (!reduceMotion) {
        world.rotation.y += (targetX - world.rotation.y) * 0.035;
        world.rotation.x += (-targetY - world.rotation.x) * 0.035;
        blade.rotation.y = Math.sin(elapsed * 0.6) * 0.045;
        lens.rotation.z += 0.006;
        iris.rotation.z -= 0.014;
        reticle.rotation.z += 0.002;
        sparks.rotation.y = Math.sin(elapsed * 0.12) * 0.09;
        sparks.position.y = Math.sin(elapsed * 0.4) * 0.08;
        arcs.forEach((arc, index) => {
          const pulse = Math.sin(elapsed * 3.2 + index * 1.9);
          arc.material.opacity = pulse > 0.55 ? (pulse - 0.55) * 1.8 : 0;
          if (pulse > 0.7 && Math.random() > 0.88) {
            const attr = arc.geometry.attributes.position;
            for (let j = 0; j < attr.count; j++) {
              attr.setX(j, 0.2 + (Math.random() - 0.5) * 0.55);
              attr.setZ(j, 0.25 + (Math.random() - 0.5) * 0.2);
            }
            attr.needsUpdate = true;
          }
        });
        cyan.intensity = 40 + Math.sin(elapsed * 2.2) * 10;
        red.intensity = 22 + Math.max(0, Math.sin(elapsed * 1.5)) * 15;
      }
      renderer.render(scene, camera);
      if (!reduceMotion) raf = window.requestAnimationFrame(render);
    };

    resize();
    render();
    if (!reduceMotion) root.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("resize", resize);

    const letters = root.querySelectorAll("[data-metal-letter]");
    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (!reduceMotion) {
      gsap.set(letters, { yPercent: 125, rotateX: -80, opacity: 0 });
      intro.to(letters, { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.95, stagger: 0.06, delay: 0.2 })
        .fromTo(root.querySelector(".hero-kicker"), { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.45")
        .fromTo(root.querySelector(".hero-description"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3")
        .fromTo(root.querySelectorAll(".hero-action, .hero-hud"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09 }, "-=0.2");
      gsap.to(root.querySelector(".hero-scan"), { xPercent: 140, duration: 1.2, ease: "power2.inOut", repeat: -1, repeatDelay: 2.8 });
      gsap.to(root.querySelector(".hero-eye-glow"), { opacity: 0.95, scale: 1.16, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.utils.toArray("[data-motion-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });
    } else {
      gsap.set(letters, { yPercent: 0, rotateX: 0, opacity: 1 });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      root.removeEventListener("pointermove", pointer);
      intro.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      scene.traverse((item) => {
        if (item.geometry) item.geometry.dispose();
        if (item.material) (Array.isArray(item.material) ? item.material : [item.material]).forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, []);

  const name = "MALICK";
  return (
    <section className="three-hero" ref={rootRef} aria-labelledby="hero-title">
      <div className="system-boot" aria-hidden="true">
        <div className="system-boot-frame">
          <div className="system-boot-top"><span>MG / SYSTEM INITIALIZATION</span><span>MT—001</span></div>
          <div className="system-boot-logo">M<span>G</span><i> //</i></div>
          <div className="system-boot-lines">
            <span>INITIALIZING DESIGN SYSTEM <b>OK</b></span>
            <span>LOADING INTERACTION LAYER <b>OK</b></span>
            <span>ESTABLISHING CONNECTION <b>OK</b></span>
          </div>
          <div className="system-boot-progress"><i /></div>
          <div className="system-boot-ready">WELCOME BACK, OPERATOR<span>_</span></div>
        </div>
      </div>
      <canvas className="three-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />
      <div className="hero-eye-glow" aria-hidden="true" />
      <div className="hero-vertical-code" aria-hidden="true">MT—001<br />DESIGN / SYSTEMS / FUTURE</div>
      <div className="three-hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="hero-live-dot" /> INDEPENDENT DESIGNER <i> / </i> BENGALURU, INDIA</div>
          <div className="metal-wordmark" aria-label="Malick">
            {name.split("").map((letter, index) => <span className="metal-letter-mask" key={letter + index}><span data-metal-letter>{letter}</span></span>)}
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
