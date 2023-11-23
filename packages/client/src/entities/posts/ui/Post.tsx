import Star from 'features/star';
import { useRef } from 'react';
import { useCameraStore } from 'shared/store/useCameraStore';
import { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from '@emotion/styled';
import { useViewStore } from 'shared/store/useWritingStore';
import * as THREE from 'three';

interface PropsType {
	position: THREE.Vector3;
	size: number;
	color: string;
	label: string;
	onClick: () => void;
	isSelected: boolean;
}

export default function Post({
	position,
	size,
	color,
	label,
	onClick,
	isSelected,
}: PropsType) {
	const { targetView, setTargetView } = useCameraStore();
	const meshRef = useRef<THREE.Mesh>(null!);
	const { view, setView } = useViewStore();

	const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		onClick();

		if (meshRef.current !== targetView) {
			setView('DETAIL');
			setTargetView(meshRef.current);
			return;
		}

		setView('WRITING');
	};

	return (
		<Star
			position={position}
			size={size}
			color={color}
			onClick={handleMeshClick}
			ref={meshRef}
		>
			{view === 'DETAIL' && isSelected && (
				<Html>
					<Label>{label}</Label>
				</Html>
			)}
		</Star>
	);
}

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
