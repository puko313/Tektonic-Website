import * as THREE from 'three';

export const getIntersectObjectsOfClick = (event, sizeX, sizeY, camera, objects, recursive=true) => {
	let clickMouse = new THREE.Vector2();

	clickMouse.x = (event.pageX / sizeX) * 2 - 1;
	clickMouse.y = -(event.pageY / sizeY) * 2 + 1;

	const raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(clickMouse, camera);

	// let arrow = new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, 800, 0xff0000 );
	// if (scene) {
	// 	scene.add( arrow );
	// }

	return raycaster.intersectObjects(objects, recursive);
}
