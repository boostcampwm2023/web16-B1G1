import { useRef } from 'react';
import { useCameraStore } from 'shared/store/useCameraStore';
import { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from '@emotion/styled';
import { useViewStore } from 'shared/store/useViewStore';
import * as THREE from 'three';
import { StarType } from 'shared/lib/types/star';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import theme from 'shared/ui/styles/theme';
import Star from 'features/star/Star';

interface PropsType {
	data: StarType;
	postId: number;
	title: string;
}

export default function Post({ data, postId, title }: PropsType) {
	const { targetView, setTargetView } = useCameraStore();
	const { view, setView } = useViewStore();

	const meshRef = useRef<THREE.Mesh>(null!);
	const [isHovered, setIsHovered] = useState(false);

	const navigate = useNavigate();

	const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();

		if (meshRef.current !== targetView) {
			setView('DETAIL');
			setTargetView(meshRef.current);
			navigate(`/home/${postId}`);
			return;
		}

		setView('POST');
		navigate(`/home/${postId}/detail`);
	};

	const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		setIsHovered(true);
	};

	const handlePointerOut = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		setIsHovered(false);
	};

	return (
		<Star
			position={
				new THREE.Vector3(data.position.x, data.position.y, data.position.z)
			}
			size={data.size}
			color={data.color}
			onClick={handleMeshClick}
			ref={meshRef}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
			brightness={data.brightness}
			shape={data.shape}
		>
			{view === 'DETAIL' && isHovered && (
				<Html>
					<Label>{title}</Label>
				</Html>
			)}
		</Star>
	);
}

const Label = styled.div`
	padding: 10px 15px;
	border-radius: 5px;
	width: fit-content;
	max-width: 200px; // TODO: 수정 예정
	text-align: center;
	background-color: ${theme.colors.background.bdp01_80};
	border: 1px solid ${theme.colors.stroke.sc};
	color: ${theme.colors.text.secondary};
	transform: translate3d(calc(-50%), calc(-250%), 0); // TODO: 수정 예정

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
