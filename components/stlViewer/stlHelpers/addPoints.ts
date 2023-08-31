import * as THREE from 'three';


/// will add the point on the model 
export function choosePoint(intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>, scene: THREE.Scene) {
	var spriteMap = new THREE.TextureLoader().load('assets/point.png');
	var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
	var sprite = new THREE.Sprite(spriteMaterial);
	sprite.scale.set(5, 5, 1);
	// Set the sprite's position to the intersection point
	sprite.position.copy(intersect.point);
	// Add the sprite to the scene
	scene.add(sprite);
}