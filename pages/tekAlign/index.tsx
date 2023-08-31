import ToolBarPieces from 'components/stlViewerSubcomponents';
import { TekAlignHeader } from 'components/tekAlignHeader';
import { TekAlignPageContent } from 'components/tekAlignPageContent';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import StlViewer from 'components/stlViewer';

const wings = [
	{
		path: '/assets/tektonicWings/tectonic_long.stl',
		preview: '/assets/tektonicWings/tectonic_angle1_preview.png',
		name: 'angle1',
		rotations: { x: 1.5, y: 0.2 },
		scale: 0.7,
		movedPos: { x: 4 }
	},
	{
		path: '/assets/tektonicWings/tectonic_angle1.stl',
		preview: '/assets/tektonicWings/tectonic_angle2_preview.png',
		name: 'angle2',
		rotations: { x: 1.5, y: 0.2 },
		scale: 0.7,
		movedPos: { x: 0, z: -2, y: -2 }
	},
	{
		path: '/assets/tektonicWings/tectonic_angle2.stl',
		preview: '/assets/tektonicWings/tectonic_long_preview.png',
		name: 'long tectonic',
		rotations: { x: 1.5, y: 0.2 },
		scale: 0.7,
		movedPos: { x: 1, z: -1, y: -1 }
	},
	{
		path: '/assets/tektonicWings/tectonic_single.stl',
		preview: '/assets/tektonicWings/tectonic_single_preview.png',
		name: 'single tectonic',
		rotations: { x: 1.5, y: 0.2 },
		scale: 0.7,
		movedPos: { x: -2, z: 0, y: -2 }
	},
	{
		path: '/assets/tektonicWings/tectonic_straight.stl',
		preview: '/assets/tektonicWings/tectonic_straight_preview.png',
		name: 'straight tec...',
		rotations: { x: 1.5, y: 0.2 },
		scale: 0.7,
		movedPos: { x: 0.5, z: 0.5, y: -2 }
	}
];

export default function TekAlign() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div>
			{/* <TekAlignHeader /> */}
			{/* <TekAlignPageContent/>   */}
			<StlViewer activeWing={wings[activeIndex]} />
			<ToolBarPieces
				wings={wings}
				activeWingIndex={activeIndex}
				setActiveWingIndex={setActiveIndex}
			/>
		</div>
	);
}
