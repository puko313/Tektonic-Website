export function createAnimate({ scene, camera, renderer }) {
	const triggers = [];

	function animate() {
		requestAnimationFrame(animate);

		triggers.forEach((trigger) => {
			trigger();
		});

		renderer.render(scene, camera);
	}
	function addTrigger(cb) {
		if (typeof cb === "function") triggers.push(cb);
	}
	function offTrigger(cb) {
		const triggerIndex = triggers.indexOf(cb);
		if (triggerIndex !== -1) {
			triggers.splice(triggerIndex, 1);
		}
	}
	return {
		animate,
		addTrigger,
		offTrigger,
	};
}