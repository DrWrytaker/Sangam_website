import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef(null);
  const [webGlSupported] = useState(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!webGlSupported) return;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Dimensions
    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 460;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    mainLight.position.set(4, 6, 4);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const tealRimLight = new THREE.DirectionalLight(0x008b96, 2.2);
    tealRimLight.position.set(-5, -2, -3);
    scene.add(tealRimLight);

    const coralAccent = new THREE.PointLight(0xe29578, 1.5, 10);
    coralAccent.position.set(0, 3, 2);
    scene.add(coralAccent);

    // 5. Khata Book (3D Ledger)
    const bookGroup = new THREE.Group();

    // Cover (Leather maroon / terracotta kirana bahi-khata)
    const coverGeo = new THREE.BoxGeometry(2.4, 0.15, 3.2);
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x9b3522, // Traditional Indian Khata Red/Terracotta
      roughness: 0.45,
      metalness: 0.15,
    });
    const coverMesh = new THREE.Mesh(coverGeo, coverMat);
    coverMesh.castShadow = true;
    coverMesh.receiveShadow = true;
    bookGroup.add(coverMesh);

    // Inner stacked paper pages
    const pagesGeo = new THREE.BoxGeometry(2.25, 0.28, 3.05);
    const pagesMat = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7, // Warm ivory parchment paper
      roughness: 0.8,
    });
    const pagesMesh = new THREE.Mesh(pagesGeo, pagesMat);
    pagesMesh.position.set(0.05, 0.18, 0);
    pagesMesh.castShadow = true;
    bookGroup.add(pagesMesh);

    // Top Cover
    const topCoverGeo = new THREE.BoxGeometry(2.4, 0.08, 3.2);
    const topCoverMesh = new THREE.Mesh(topCoverGeo, coverMat);
    topCoverMesh.position.set(0, 0.36, 0);
    topCoverMesh.castShadow = true;
    bookGroup.add(topCoverMesh);

    // Gold Foil Ribbon / Bookmark
    const ribbonGeo = new THREE.BoxGeometry(0.12, 0.03, 3.6);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xe29578, // Saffron-coral gold ribbon
      metalness: 0.7,
      roughness: 0.2,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbonMesh.position.set(0.3, 0.41, 0.2);
    bookGroup.add(ribbonMesh);

    // Initial slight tilt
    bookGroup.rotation.x = 0.55;
    bookGroup.rotation.y = -0.45;
    bookGroup.rotation.z = 0.1;
    scene.add(bookGroup);

    // 6. Orbiting 3D Holographic UPI Coins
    const coinData = [
      { name: 'PhonePe', color: 0x5f259f, radius: 2.5, speed: 0.8, yOffset: 0.4 },
      { name: 'GPay',    color: 0x1a73e8, radius: 2.7, speed: -0.65, yOffset: -0.5 },
      { name: 'Paytm',   color: 0x002970, radius: 2.4, speed: 0.95, yOffset: 0.8 },
      { name: 'Cash',    color: 0x059669, radius: 2.6, speed: -0.5, yOffset: -0.2 },
    ];

    const coinGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 32);
    const coinMaterials = [];
    const coinMeshes = coinData.map((data) => {
      const mat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: data.color,
        emissiveIntensity: 0.25,
      });
      coinMaterials.push(mat);
      const mesh = new THREE.Mesh(coinGeo, mat);
      mesh.rotation.x = Math.PI / 2;
      mesh.castShadow = true;
      scene.add(mesh);
      return { mesh, ...data, angle: Math.random() * Math.PI * 2 };
    });

    // 7. Floating Golden Particle Dust
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x008b96,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Mouse & Keyboard Parallax Controls
    let targetRotX = 0.55;
    let targetRotY = -0.45;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotY = -0.45 + mouseX * 0.45;
      targetRotX = 0.55 - mouseY * 0.35;
    };

    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') targetRotY -= 0.1;
      if (e.key === 'ArrowRight') targetRotY += 0.1;
      if (e.key === 'ArrowUp') targetRotX -= 0.1;
      if (e.key === 'ArrowDown') targetRotX += 0.1;
    };

    window.addEventListener('mousemove', onMouseMove);
    currentMount.addEventListener('keydown', onKeyDown);

    // 9. Animation Loop
    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth book hover & mouse tilt
      bookGroup.rotation.y += (targetRotY - bookGroup.rotation.y) * 0.05;
      bookGroup.rotation.x += (targetRotX - bookGroup.rotation.x) * 0.05;
      bookGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Orbiting coins
      coinMeshes.forEach((coin) => {
        coin.angle += coin.speed * 0.015;
        coin.mesh.position.x = Math.cos(coin.angle) * coin.radius;
        coin.mesh.position.z = Math.sin(coin.angle) * coin.radius;
        coin.mesh.position.y = coin.yOffset + Math.sin(elapsedTime * 2 + coin.angle) * 0.2;
        coin.mesh.rotation.y += 0.02;
        coin.mesh.rotation.z += 0.01;
      });

      // Subtle particle float
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 11. Complete Memory & Resource Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeEventListener('keydown', onKeyDown);
        if (renderer.domElement) {
          currentMount.removeChild(renderer.domElement);
        }
      }

      // Dispose Geometries
      coverGeo.dispose();
      pagesGeo.dispose();
      topCoverGeo.dispose();
      ribbonGeo.dispose();
      coinGeo.dispose();
      particleGeo.dispose();

      // Dispose Materials
      coverMat.dispose();
      pagesMat.dispose();
      ribbonMat.dispose();
      particleMat.dispose();
      coinMaterials.forEach((m) => m.dispose());

      // Dispose Renderer
      renderer.dispose();
    };
  }, [webGlSupported]);

  if (!webGlSupported) {
    return (
      <div 
        role="region" 
        aria-label="Khata Ledger 3D Fallback Display"
        className="relative w-full h-[460px] lg:h-[540px] flex items-center justify-center rounded-3xl bg-gradient-to-br from-[#FAF8F4] to-[#E0F3F5] border border-[#DDE7E8] p-8 text-center"
      >
        <div className="max-w-xs space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#006D77] text-white font-bold text-2xl mx-auto flex items-center justify-center shadow-lg shadow-[#006D77]/20">
            सं
          </div>
          <h4 className="font-extrabold text-lg text-[#122326]">Sangam Khata Ledger</h4>
          <p className="text-xs text-[#4A6367]">
            WebGL hardware acceleration is disabled in this environment. Full 3D rendering will resume on a WebGL-enabled device.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Interactive 3D Kirana Khata Ledger with orbiting UPI coins. Use mouse or arrow keys to rotate."
      className="relative w-full h-[460px] lg:h-[540px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#006D77] rounded-3xl"
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden" />

      {/* Floating Badges */}
      <div className="absolute top-6 left-6 glass-panel px-3.5 py-2 rounded-2xl shadow-sm pointer-events-none flex items-center gap-2 border border-[#DDE7E8]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-ping" />
        <span className="text-[12px] font-bold text-[#122326]">Live 3D Khata & UPI Engine</span>
      </div>

      <div className="absolute bottom-6 right-6 glass-panel px-4 py-2 rounded-2xl shadow-sm pointer-events-none text-right border border-[#DDE7E8]">
        <p className="text-[11px] font-bold text-[#006D77] uppercase tracking-wider">Zero-Touch Capture</p>
        <p className="text-[12px] text-[#4A6367]">Move cursor or arrow keys to inspect</p>
      </div>
    </div>
  );
}
