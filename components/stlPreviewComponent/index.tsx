import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader as Loader } from "three/examples/jsm/loaders/STLLoader";

const ConvertSTLToImage = ({pathToStl}: {pathToStl:string}) => {
  // const containerRef = useRef();
  // const light = new THREE.AmbientLight(0xffffff);
 
  // const loader = new Loader();
  // useEffect(() => {
  //   const scene = new THREE.Scene();
  //   scene.add(light);
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //   const renderer = new THREE.WebGLRenderer({ antialias: true });
  //   renderer.setSize(250, 250);
  //   // @ts-ignore
  //   containerRef.current.appendChild(renderer.domElement);

  //   loader.load(pathToStl, function (geometry) {
  //     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //     const mesh = new THREE.Mesh(geometry, material);
  //     mesh.rotation.x = Math.PI / 2; // Rotate the model 90 degrees along the X axis
  //     mesh.rotation.y = Math.PI / 4; 
  //     mesh.scale.set(10, 10, 10);
  //     scene.add(mesh);
  //     camera.position.z = 5;
  //     const animate = function () {
  //       requestAnimationFrame(animate);
  //       mesh.rotation.x += 0.01;
  //       mesh.rotation.y += 0.01;
  //       renderer.render(scene, camera);
  //     };
  //     animate();
  //   });
  // }, []);

  return <div />;
};

export default ConvertSTLToImage;