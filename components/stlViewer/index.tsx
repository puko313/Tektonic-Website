import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { STLLoader as Loader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { createAnimate } from './stlHelpers/animate';
import { centerGroup } from './stlHelpers/centerGroup';
import { getIntersectObjectsOfClick } from './stlHelpers/getIntersectObjectsOfClick';

const loader = new Loader();
const textureLoader = new THREE.TextureLoader();

export default function StlViewer({
	sizeX = 1400,
	sizeY = 1400,
	pathToModel = '/assets/Lyn.stl',
	pathToModelTexture = '/assets/whiteTextureBasic.jpg',
	activeWing
}) {
	const containerRef = useRef();
	const [transformControls, setTransformControls] = useState<TransformControls>(undefined);
	const [orbitControls, setOrbitControls] = useState(undefined);
	const [orbitControlsValues, setOrbitControlsValues] = useState<any>({
		LEFT: THREE.MOUSE.ROTATE,
		MIDDLE: THREE.MOUSE.PAN,
		RIGHT: THREE.MOUSE.PAN,  // for now it's as the same like the middle button
	});
	const [renderer, setRenderer] = useState(undefined);
	const [camera, setCamera] = useState(undefined);
	const [scene, setScene] = useState(undefined);
	const [coreModelMesh, setCoreModelMesh] = useState(null);
	const [pieces, setPieces] = useState({});
	const [draggingControl, setDraggingControl] = useState(false);

	let scrollRotateEvent;

	useEffect(() => {
		setScene(new THREE.Scene());
		const cam = new THREE.PerspectiveCamera(
			750,
			sizeX / sizeY,
			10,
			100000
		)
		setCamera(cam);

		setRenderer(new THREE.WebGLRenderer());
	}, []);

	useEffect(() => {
		const handleClick = (event) => {
			if (!draggingControl) {
				const intersects = getIntersectObjectsOfClick(event, sizeX, sizeY, camera, Object.values(pieces));
				const scrollRotate = (e) => {
					e.preventDefault();
					orbitControls.enableZoom = false;

					const pos = camera.position
					let x = 0;
					let y = 0;
					let z = 0;
					if (pos.x > pos.y && pos.x > pos.z) {
						x = 0.1;
						y = pos.y / (pos.x * 10)
						z = pos.z / (pos.x * 10)
					} else if (pos.y > pos.x && pos.y > pos.z) {
						y = 0.1;
						x = pos.y / (pos.y * 10)
						z = pos.z / (pos.y * 10)
					} else if (pos.z > pos.x && pos.z > pos.y) {
						z = 0.1;
						x = pos.y / (pos.z * 10)
						z = pos.z / (pos.z * 10)
					}
					intersects[0].object.parent.rotateX(x)
					intersects[0].object.parent.rotateY(y)
					intersects[0].object.parent.rotateZ(z)

					return
				}
				if (intersects.length) {

					transformControls.attach(intersects[0].object.parent);
					renderer.domElement.addEventListener('wheel', scrollRotate);
					scrollRotateEvent = scrollRotate;
				} else {
					orbitControls.enableZoom = true;
					renderer.domElement.removeEventListener('wheel', scrollRotateEvent);
					transformControls.detach();
				}
			}
		}

		if (renderer && transformControls) {
			// Use setTimeout to let the draggingControl check do its job.
			setTimeout(() => {
				renderer.domElement.addEventListener('click', handleClick);
			}, 0);
			return () => {
				renderer.domElement.removeEventListener('click', handleClick);
			};
		}
	}, [renderer, transformControls, pieces, draggingControl]);

	useEffect(() => {
		if (renderer && camera && scene) {
			setTransformControls(new TransformControls(camera, renderer.domElement));

			renderer.setSize(sizeX, sizeY);
			setOrbitControls(new OrbitControls(camera, renderer.domElement));

			// three js window
			if (containerRef.current)
				(containerRef.current as any).appendChild(renderer.domElement);
			const animate = createAnimate({ scene, camera, renderer });
			camera.position.z = 350;
			animate.animate();

			renderModel();
		}
	}, [renderer, camera, scene]);

	useEffect(() => {
		if (orbitControls) {
			// add controls to window
			// zoom parameters how much can zoom
			orbitControls.maxDistance = 450;
			orbitControls.minDistance = 125;
			orbitControls.mouseButtons = orbitControlsValues;
		}
	}, [orbitControls]);

	const clickEKey = () => {

		transformControls.dragging = false
		transformControls.enabled = false
		transformControls.showX = false
		transformControls.showY = false
		transformControls.showZ = false
		const onClick = (event, meshes, mouseType) => {
			const cameraRotationMatrix = new THREE.Matrix4();
			cameraRotationMatrix.extractRotation(camera.matrixWorld);
			const positions = camera.position;
			const mouse = new THREE.Vector3(5, 2);
			mouse.x = (event.clientX / 1400) * 2 - 1;
			mouse.y = -(event.clientY / 1400) * 2 + 1;
			const raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(mouse, camera);

			for (let index = 0; index < scene.children.length; index++) {
				const element = scene.children[index];
				if (element.type == 'Group') {

					const intersectsGroup = raycaster.intersectObject(element.children[0]);
					if (mouseType == "mousedown" && intersectsGroup.length > 0) {
						element['mousedown'] = true
						orbitControls.enablePan = false;
						orbitControls.enableRotate = false;
					}
					if (mouseType == "mousemove" && element['mousedown']) {
						mouse.x = (event.clientX / 1400) * 2 - 1;
						mouse.y = -(event.clientY / 1400) * 2 + 1;
						// element.position.x = mouse.x * 85;
						// element.position.y = mouse.y * 85;
						const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // plane parallel to screen
						const raycaster = new THREE.Raycaster();
						raycaster.setFromCamera(mouse, camera);
						const intersection = new THREE.Vector3();
						intersection.x = element.position.x
						intersection.y = element.position.y
						intersection.z = element.position.z
						raycaster.ray.intersectPlane(plane, intersection);
						const mouseWorldPos = intersection;
						element.position.x = mouseWorldPos.x;
						element.position.y = mouseWorldPos.y;
						element.position.z = mouseWorldPos.z ? mouseWorldPos.z : element.position.z;

						setTransformControls(transformControls);
					}
				}

			}


			for (let index = 0; index < scene.children.length; index++) {
				const element = scene.children[index];
				if (element.type == 'Group') {
					if (mouseType == "mouseup") {
						element['mousedown'] = false
						orbitControls.enablePan = true;
						orbitControls.enableRotate = true;
						setTransformControls(transformControls);
					}
				}

			}


			for (let i = 0; i < meshes.length; i++) {
				const mesh = meshes[i];
				const intersectsTop = raycaster.intersectObject(mesh.top);
				const intersectsBottom = raycaster.intersectObject(mesh.bottom);
				const intersectsRight = raycaster.intersectObject(mesh.right);
				const intersectsLeft = raycaster.intersectObject(mesh.left);

				let mouseLeaveX = mesh.mouseLeaveX
				let mouseLeaveY = mesh.mouseLeaveY

				if (intersectsBottom.length > 0) {
					orbitControls.enableRotate = false
					if (mouseType == 'mousedown') {
						mesh.dragBottom = true
					}
				}
				else if (intersectsTop.length > 0) {
					orbitControls.enableRotate = false
					if (mouseType == 'mousedown') {
						mesh.dragTop = true
					}
				}
				else if (intersectsRight.length > 0) {
					orbitControls.enableRotate = false
					if (mouseType == 'mousedown') {
						mesh.dragRight = true
					}
				} else if (intersectsLeft.length > 0) {
					orbitControls.enableRotate = false
					if (mouseType == 'mousedown') {
						mesh.dragLeft = true
					}
				}

				if (mouseType == 'mousemove' && mesh.dragTop) {
					if (mouseLeaveX > event.clientX) {
						mesh.element.rotateX(positions.x / 17500)
						mesh.element.rotateZ(positions.z / 17500)
					} else {
						mesh.element.rotateX(-1 * positions.x / 17500)
						mesh.element.rotateZ(-1 * positions.z / 17500)
					}
				}

				if (mouseType == 'mousemove' && mesh.dragBottom) {
					if (mouseLeaveX > event.clientX) {
						mesh.element.rotateX(-1 * positions.x / 17500)
						mesh.element.rotateZ(-1 * positions.z / 17500)
					} else {
						mesh.element.rotateZ(positions.z / 17500)
						mesh.element.rotateX(positions.x / 17500)
					}
				}

				if (mouseType == 'mousemove' && mesh.dragLeft) {
					if (mouseLeaveY > event.clientY) {
						mesh.element.rotateY(-0.02)
					} else {
						mesh.element.rotateY(+0.02)
					}
				}


				if (mouseType == 'mousemove' && mesh.dragRight) {
					if (mouseLeaveY > event.clientY) {
						mesh.element.rotateY(-0.02)
					} else {
						mesh.element.rotateY(+0.02)
					}
				}

				if (mouseType == 'mouseup') {
					mesh.dragTop = false
					mesh.dragBottom = false
					mesh.dragRight = false
					mesh.dragLeft = false
					orbitControls.enableRotate = true

				}

				mesh.mouseLeaveX = event.clientX
				mesh.mouseLeaveY = event.clientY
			}

		}

		const meshes = [];
		const spritePoint = new THREE.TextureLoader().load('assets/point1.svg');
		const spriteMaterial = new THREE.SpriteMaterial({ map: spritePoint });

		for (let i = 0; i < scene.children.length; i++) {
			const element = scene.children[i];
			if (element.type == "Group") {
				let top = true;
				let bottom = true;
				let right = true;
				let left = true;
				for (let j = 0; j < element.children.length; j++) {
					const child = element.children[j]
					if (child.name == 'pointTop') {
						top = false
					}
					if (child.name == 'pointBottom') {
						bottom = false
					}

					if (child.name == 'pointRight') {
						right = false
					}

					if (child.name == 'pointLeft') {
						left = false
					}
				}

				const meshTop = new THREE.Sprite(spriteMaterial);
				meshTop.scale.set(3, 1.4, 1);
				meshTop.name = 'pointTop'
				meshTop.position.set(0.9, 8, -0.8);

				const meshBottom = new THREE.Sprite(spriteMaterial);
				meshBottom.scale.set(3, 1.4, 1);
				meshBottom.position.set(-0.2, -8, 1);
				meshBottom.name = 'pointBottom'

				const meshRight = new THREE.Sprite(spriteMaterial);
				meshRight.scale.set(3, 1.4, 1);
				meshRight.position.set(8, -0.5, 0);
				meshRight.name = 'pointRight'
				meshRight.rotateX(Math.PI / 4);

				const meshLeft = new THREE.Sprite(spriteMaterial);
				meshLeft.scale.set(3, 1.4, 1);
				meshLeft.position.set(-8, 0.5, 0);
				meshLeft.name = 'pointLeft'

				meshes.push({
					top: meshTop,
					bottom: meshBottom,
					right: meshRight,
					left: meshLeft,
					element,
					dragTop: false,
					dragBotom: false,
					dragRight: false,
					click: false,
					mouseLeaveX: 0,
					mouseLeaveY: 0,
				})

				if (top) {
					element.add(meshTop)
				}

				if (bottom) {
					element.add(meshBottom)
				}

				if (right) {
					element.add(meshRight)
				}

				if (left) {
					element.add(meshLeft)
				}
			}
		}
		renderer.domElement.addEventListener('mousemove', (ev) => onClick(ev, meshes, 'mousemove'));
		renderer.domElement.addEventListener('mousedown', (ev) => onClick(ev, meshes, 'mousedown'));
		renderer.domElement.addEventListener('mouseup', (ev) => onClick(ev, meshes, 'mouseup'));
		renderer.domElement.addEventListener('click', (ev) => onClick(ev, meshes, 'click'));
		setTransformControls(transformControls);
	}

	useEffect(() => {
		const handleDblClick = (event) => {
			const intersects = getIntersectObjectsOfClick(event, sizeX, sizeY, camera, [coreModelMesh], true);
			const mouse = new THREE.Vector3(5, 2);
			mouse.x = (event.clientX / 1400) * 2 - 1;
			mouse.y = -(event.clientY / 1400) * 2 + 1;
			const raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(mouse, camera);
			for (let index = 0; index < scene.children.length; index++) {
				const element = scene.children[index];
				console.log(element);
				if (element.type == 'Group') {

					const intersectsGroup = raycaster.intersectObject(element.children[0]);
					if (intersectsGroup.length > 0) {
						const meshesArr = [];
						for (let j = 0; j < element.children.length; j++) {
							const mesh = element.children[j];
							if(!(mesh.type == 'Mesh' && mesh.name == 'wing')){
								meshesArr.push(mesh)
							}
						}
						element.children = meshesArr
						loader.load(activeWing.path, (geometry) => {
							console.log(element);
							
							const whiteTexture = '/assets/whiteTextureBasic.jpg';
							let wingModelMesh = undefined;
							const material = new THREE.MeshMatcapMaterial({
								color: 0xabdbe3, // color for texture
								matcap: textureLoader.load(whiteTexture)
							});
							wingModelMesh = new THREE.Mesh(geometry, material);
							wingModelMesh.geometry.computeVertexNormals();
							wingModelMesh.geometry.center();
							// rotations
							wingModelMesh.rotation.y = activeWing?.rotations.y;  // will add some rotation
							wingModelMesh.rotation.x = activeWing?.rotations.x;   // rotate model of core element
							wingModelMesh.position.set(element.position.x, element.position.y, element.position.z)

							//possitions
							if (activeWing?.movedPos.x)
								wingModelMesh.position.x += activeWing.movedPos.x;
							if (activeWing?.movedPos.y)
								wingModelMesh.position.y += activeWing.movedPos.y;
							if (activeWing?.movedPos.z)
								wingModelMesh.position.z += activeWing.movedPos.z;
							// wingModelMesh.position.set(element.position.x, element.position.y, element.position.z)
							// scales
							wingModelMesh.scale.x = activeWing?.scale || 0.7;
							wingModelMesh.scale.y = activeWing?.scale || 0.7;
							wingModelMesh.scale.z = activeWing?.scale || 0.7;
							wingModelMesh.name = 'wing'
							element.attach(wingModelMesh);
						});
						return
					}
				}
			}
			if (intersects.length > 0) { // clicked on model or no
				let intersect = intersects[0];
				//show core screw/(implant) pices
				const core = addCorePieces(intersect, scene, loader);
				setScene(core)

			}
		};

		if (renderer) {
			renderer.domElement.addEventListener('dblclick', handleDblClick);
			return () => {
				renderer.domElement.removeEventListener('dblclick', handleDblClick);
			};
		}
	}, [activeWing, coreModelMesh]);

	useEffect(() => {
		if (transformControls) {
			transformControls.space = 'local';
			transformControls.addEventListener('change', () => {
				renderer.render(scene, camera);

			});
			transformControls.addEventListener('dragging-changed', event => {
				orbitControls.enabled = !event.value;
				setDraggingControl(event.value);
			});

			window.addEventListener('keydown', event => {
				switch (event.keyCode) {
					case 46: // D
						if (transformControls.object) {
							setPieces((oldPice) => Object.keys(oldPice).reduce((obj, k) => {
								if (k !== transformControls.object.uuid) {
									obj[k] = oldPice[k];
								}
								return obj;
							}, {}))
							scene.remove(transformControls.object)
							transformControls.detach();
						}
						break;
				}
			});
		}
	}, [transformControls]);

	const renderModel = () => {
		loader.load(pathToModel, (geometry) => {
			const material = new THREE.MeshMatcapMaterial({
				color: 0xffffff, // color for texture
				matcap: textureLoader.load(pathToModelTexture)
			});
			const mesh = new THREE.Mesh(geometry, material);
			mesh.geometry.computeVertexNormals();
			mesh.geometry.center();
			// will add click method to object
			setCoreModelMesh(mesh);
			mesh.rotateY(0.5)
			scene.add(mesh);
		});
	};

	// will add core paces to model
	const addCorePieces = function (
		intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>,
		scene: THREE.Scene, loader: Loader,
	) {
		const coreModelPath = '/assets/tektonicCoreParts/CoreStep.stl';
		const whiteTexture = '/assets/whiteTextureBasic.jpg';
		let coreModelMesh = undefined;
		let wingModelMesh = undefined;

		const group = new THREE.Group();

		// render model
		loader.load(coreModelPath, (geometry) => {
			const material = new THREE.MeshMatcapMaterial({
				color: 0xffffff, // color for texture
				matcap: textureLoader.load(whiteTexture)
			});
			coreModelMesh = new THREE.Mesh(geometry, material);
			coreModelMesh.geometry.computeVertexNormals();
			coreModelMesh.geometry.center();
			coreModelMesh.position.copy(intersect.point);
			coreModelMesh.rotation.z = 1.65;  // will add some rotation
			coreModelMesh.rotation.x = -0.1;   // rotate model of core element

			coreModelMesh.geometry.center();

			group.attach(coreModelMesh);
			centerGroup(group);
			clickEKey()
			// clickWKey()
		});

		// loader.load(activeWing.path, (geometry) => {
		// 	const material = new THREE.MeshMatcapMaterial({
		// 		color: 0xabdbe3, // color for texture
		// 		matcap: textureLoader.load(whiteTexture)
		// 	});
		// 	wingModelMesh = new THREE.Mesh(geometry, material);
		// 	wingModelMesh.geometry.computeVertexNormals();
		// 	wingModelMesh.geometry.center();
		// 	wingModelMesh.position.copy(intersect.point);
		// 	// rotations
		// 	wingModelMesh.rotation.y = activeWing?.rotations.y;  // will add some rotation
		// 	wingModelMesh.rotation.x = activeWing?.rotations.x;   // rotate model of core element

		// 	//possitions
		// 	if (activeWing?.movedPos.x)
		// 		wingModelMesh.position.x += activeWing?.movedPos.x;
		// 	if (activeWing?.movedPos.y)
		// 		wingModelMesh.position.y += activeWing?.movedPos.y;
		// 	if (activeWing?.movedPos.z)
		// 		wingModelMesh.position.z += activeWing?.movedPos.z;

		// 	// scales
		// 	wingModelMesh.scale.x = activeWing?.scale || 0.7;
		// 	wingModelMesh.scale.y = activeWing?.scale || 0.7;
		// 	wingModelMesh.scale.z = activeWing?.scale || 0.7;
		// 	group.attach(wingModelMesh);
		// 	centerGroup(group);
		// });

		setPieces((prevPieces) => {
			let pieces = Object.assign({}, prevPieces);
			pieces[group.uuid] = group;
			return pieces;
		})

		const axis = new THREE.Vector3(0, 1, 1.5); // local Y/Z axis
		group.rotateOnAxis(axis, 0.1);
		scene.attach(group);
		transformControls.detach();
		scene.attach(transformControls);
		return scene
	};

	return (<>
		<div id='info' style={{
			position: 'absolute',
			top: '0px',
			width: '100%',
			padding: '10px',
			boxSizing: 'border-box',
			textAlign: 'center',
			userSelect: 'none',
			pointerEvents: 'none',
			zIndex: 1,
			color: '#ffffff'
		}}>
			"W" translate | "E" rotate | "R" scale | "D" remove
		</div>
		<div ref={containerRef} />
	</>);
}
