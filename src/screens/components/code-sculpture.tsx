"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Lazy WebGL decoration with a static fallback and no render loop offscreen. */
export function CodeSculpture({
  variant = "code",
}: {
  variant?: "code" | "orbit";
}) {
  const orbit = variant === "orbit";
  const host = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const pausedRef = useRef(false);
  const updateLoop = useRef<(() => void) | null>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let started = false;
    let visible = false;
    let contextLost = false;
    let cleanup: (() => void) | undefined;
    let sync: (() => void) | undefined;

    async function initialize() {
      if (started || preference.matches || disposed) return;
      started = true;
      const THREE = await import("three");
      if (disposed || preference.matches) {
        started = false;
        return;
      }
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
      camera.position.set(0, 0, orbit ? 6.7 : 7.5);
      const sculpture = new THREE.Group();
      scene.add(sculpture);
      scene.add(new THREE.AmbientLight(0xffffff, 2));
      const key = new THREE.DirectionalLight(0xffe4b1, 5);
      key.position.set(2, 3, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x8fdab0, 3);
      rim.position.set(-3, -1, 2);
      scene.add(rim);
      const green = new THREE.MeshStandardMaterial({
        color: 0x86bf87,
        metalness: 0.55,
        roughness: 0.28,
      });
      const gold = new THREE.MeshStandardMaterial({
        color: 0xf5b34c,
        metalness: 0.65,
        roughness: 0.25,
      });
      const segment = new THREE.CapsuleGeometry(0.085, 0.62, 4, 12);
      for (const side of [-1, 1]) {
        for (const half of [-1, 1]) {
          const stroke = new THREE.Mesh(segment, green);
          stroke.position.set(side * 0.9, half * 0.25, 0);
          stroke.rotation.z = (side * half * Math.PI) / 4;
          if (!orbit) sculpture.add(stroke);
        }
      }
      const slashGeometry = new THREE.CapsuleGeometry(0.085, 1.05, 4, 12);
      const slash = new THREE.Mesh(slashGeometry, gold);
      slash.rotation.z = -0.3;
      if (!orbit) sculpture.add(slash);
      const ringGeometry = new THREE.TorusGeometry(
        1.65,
        orbit ? 0.032 : 0.018,
        10,
        100,
      );
      const ring = new THREE.Mesh(ringGeometry, orbit ? gold : green);
      ring.rotation.set(0.7, 0.3, 0);
      sculpture.add(ring);
      const outerRing = new THREE.Mesh(ringGeometry, gold);
      outerRing.scale.setScalar(1.18);
      outerRing.rotation.set(-0.6, 0.5, 0.5);
      const innerRing = new THREE.Mesh(ringGeometry, green);
      innerRing.scale.setScalar(0.82);
      innerRing.rotation.set(0.2, -0.65, -0.3);
      if (orbit) sculpture.add(outerRing, innerRing);
      const beadGeometry = new THREE.IcosahedronGeometry(0.13, 0);
      const bead = new THREE.Mesh(beadGeometry, gold);
      sculpture.add(bead);
      let elapsed = 0;
      let previous = 0;
      const pointer = { x: 0, y: 0 };
      const render = (time: number) => {
        // Decorative motion does not need to render at the display's full refresh rate.
        if (previous && time - previous < 1000 / 30) return;
        const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
        previous = time;
        elapsed += delta;
        const smoothing = 1 - Math.exp(-delta * 4);
        sculpture.rotation.y +=
          (pointer.x * 0.3 +
            Math.sin(elapsed * 0.35) * 0.12 -
            sculpture.rotation.y) *
          smoothing;
        sculpture.rotation.x +=
          (-pointer.y * 0.15 - sculpture.rotation.x) * smoothing;
        sculpture.position.y = Math.sin(elapsed * 0.8) * 0.07;
        if (orbit) {
          ring.rotation.z = elapsed * 0.09;
          outerRing.rotation.z = -elapsed * 0.07;
          innerRing.rotation.y = -0.65 + Math.sin(elapsed * 0.2) * 0.2;
        }
        bead.position.set(
          Math.cos(elapsed * 0.45) * 1.65,
          Math.sin(elapsed * 0.45) * 1.25,
          Math.sin(elapsed * 0.45) * 0.9,
        );
        renderer.render(scene, camera);
      };
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      sync = () => {
        previous = 0;
        renderer.setAnimationLoop(
          visible &&
            !document.hidden &&
            !pausedRef.current &&
            !preference.matches &&
            !contextLost
            ? render
            : null,
        );
      };
      updateLoop.current = sync;
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = element.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      const leave = () => {
        pointer.x = 0;
        pointer.y = 0;
      };
      const lost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        renderer.setAnimationLoop(null);
        setReady(false);
      };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      element.appendChild(renderer.domElement);
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      document.addEventListener("visibilitychange", sync);
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      resize();
      render(0);
      sync();
      setReady(true);
      cleanup = () => {
        observer.disconnect();
        renderer.setAnimationLoop(null);
        document.removeEventListener("visibilitychange", sync!);
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        segment.dispose();
        slashGeometry.dispose();
        ringGeometry.dispose();
        beadGeometry.dispose();
        green.dispose();
        gold.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        updateLoop.current = null;
      };
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible)
        initialize().catch(() => {
          setReady(false);
          cleanup?.();
        });
      sync?.();
    });
    const onPreference = () => {
      if (preference.matches) setReady(false);
      else if (started) setReady(Boolean(cleanup) && !contextLost);
      else if (visible) initialize().catch(() => setReady(false));
      sync?.();
    };
    observer.observe(element);
    preference.addEventListener("change", onPreference);
    return () => {
      disposed = true;
      observer.disconnect();
      preference.removeEventListener("change", onPreference);
      cleanup?.();
    };
  }, [orbit]);

  return (
    <div
      className={`code-sculpture sculpture-${variant} ${ready ? "is-ready" : ""}`}
    >
      <div ref={host} className="sculpture-canvas" aria-hidden="true" />
      <span className="sculpture-fallback" aria-hidden="true">
        {orbit ? "" : "</>"}
      </span>
      {ready && (
        <button
          type="button"
          className="sculpture-toggle"
          aria-label={
            orbit
              ? paused
                ? "Retomar órbitas 3D"
                : "Pausar órbitas 3D"
              : paused
                ? "Retomar animação 3D"
                : "Pausar animação 3D"
          }
          aria-pressed={paused}
          onClick={() => {
            pausedRef.current = !paused;
            setPaused(!paused);
            updateLoop.current?.();
          }}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
          <span>3D</span>
        </button>
      )}
    </div>
  );
}
