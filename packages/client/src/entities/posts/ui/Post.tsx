import Star from 'features/star';
import { useRef } from 'react';
import { useCameraStore } from 'shared/store/useCameraStore';
import { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from '@emotion/styled';

interface PropsType {
	position: THREE.Vector3;
	size: number;
	color: string;
	label: string;
}

export default function Post({ position, size, color, label }: PropsType) {
	const { targetView, setTargetView } = useCameraStore();
	const meshRef = useRef<THREE.Mesh>(null!);

	const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();

		if (meshRef.current !== targetView) {
			setTargetView(meshRef.current);
			return;
		}

		setTargetView(null);
	};

	return (
		<Star
			position={position}
			size={size}
			color={color}
			onClick={handleMeshClick}
			ref={meshRef}
		>
			<Html>
				<Label>{label}</Label>
			</Html>
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
