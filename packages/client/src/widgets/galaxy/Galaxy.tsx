import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances } from './lib/modules';
import { STARS_NUM, starTypes } from './lib/constants';

export default function Galaxy() {
	const galaxyRef = useRef<THREE.Group>(null!);

	useFrame((_, delta) => (galaxyRef.current.rotation.y += delta / 100));

	const stars = useMemo(() => {
		const starList = [];
		for (let i = 0; i < starTypes.size.length; i++) {
			const count = STARS_NUM * starTypes.percentage[i];
			const size = starTypes.size[i];
			const color = starTypes.color[i];
			starList.push(
				<Instances count={count} size={size} color={color} key={i} />,
			);
		}
		return starList;
	}, []);

	return <group ref={galaxyRef}>{stars}</group>;
}
