import Star from '../Star';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useCameraStore } from 'store/useCameraStore';
import { useRef } from 'react';

const dummyData = [
	{
		position: new THREE.Vector3(1000, 1000, 1800),
		size: 100,
		color: 'red',
	},
	{
		position: new THREE.Vector3(1300, 500, 1000),
		size: 200,
		color: 'blue',
	},
	{
		position: new THREE.Vector3(3000, 1000, 2500),
		size: 150,
		color: 'yellow',
	},
]; // TODO: 서버로부터 받아온 데이터로 변경 필요

export default function PostStars() {
	const { targetView, setTargetView } = useCameraStore();
	const stars: JSX.Element[] = [];

	dummyData.forEach((data, index) => {
		const meshRef = useRef<THREE.Mesh>(null!);

		const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
			e.stopPropagation();

			if (meshRef.current !== targetView) {
				setTargetView(meshRef.current);
				return;
			}

			setTargetView(null);
		};

		stars.push(
			<Star
				key={index}
				position={data.position}
				size={data.size}
				color={data.color}
				ref={meshRef}
				onClick={handleMeshClick}
			>
				<Html>
					<div className="label">별글 입니당</div>
				</Html>
			</Star>,
		);
	});

	return <group>{stars}</group>;
}
