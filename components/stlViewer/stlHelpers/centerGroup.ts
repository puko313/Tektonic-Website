import { Vector3 } from 'three';

export const centerGroup = (group) => {
	const centers = [];

	group.children.forEach(mesh => {
		let geometry = mesh.geometry;
		geometry.computeBoundingBox();

		const center = new Vector3();
		center.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
		center.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
		center.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

		centers.push(mesh.position);
	});

	const center = new Vector3();

	centers.forEach(c => center.add(c));
	center.divideScalar(centers.length);

	group.position.set(center.x, center.y, center.z);

	group.children.forEach(mesh => {
		const oldPos = mesh.position.clone();
		mesh.position.set(
			oldPos.x - center.x,
			oldPos.y - center.y,
			oldPos.z - center.z
		);
	})
}
