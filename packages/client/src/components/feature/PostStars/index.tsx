import Star from '../Star';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useCameraStore } from 'store/useCameraStore';
import { useRef } from 'react';
import styled from '@emotion/styled';

const Label = styled.div`
	transform: translate3d(calc(60%), calc(-30%), 0);
	background: #fff;
	color: #000;
	padding: 10px 15px;
	border-radius: 5px;
	font-family: 'Noto Sans KR', sans-serif;
	width: 100%;
	text-align: center;

	&::before {
		content: '';
		position: absolute;
		top: 20px;
		left: -30px;
		height: 2px;
		width: 50px;
		background: #fff;
	}
`;

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
					<Label>별글 입니당</Label>
				</Html>
			</Star>,
		);
	});

	return <group>{stars}</group>;
}
