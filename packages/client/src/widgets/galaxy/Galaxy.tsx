import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances } from './lib/modules';
import { STARS_NUM, starTypes } from './lib/constants';

interface PropsType {
	number?: number;
	isCustom?: boolean;
}

export default function Galaxy({
	number = STARS_NUM,
	isCustom = false,
}: PropsType) {
	const galaxyRef = useRef<THREE.Group>(null!);

	useFrame((_, delta) => (galaxyRef.current.rotation.y += delta / 100));

	const stars = useMemo(() => {
		const starList = [];
		for (let i = 0; i < starTypes.size.length; i++) {
			const count = number * starTypes.percentage[i];
			const size = starTypes.size[i];
			const color = starTypes.color[i];
			starList.push(
				<Instances
					count={count}
					size={size}
					color={color}
					key={i}
					isCustom={isCustom}
				/>,
			);
		}
		return starList;
	}, []);

	return <group ref={galaxyRef}>{stars}</group>;
}
