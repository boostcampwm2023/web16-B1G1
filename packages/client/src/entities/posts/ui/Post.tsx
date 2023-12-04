import Star from 'features/star';
import { useRef } from 'react';
import { useCameraStore } from 'shared/store/useCameraStore';
import { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from '@emotion/styled';
import { useViewStore } from 'shared/store/useViewStore';
import * as THREE from 'three';
import { StarData } from 'shared/lib/types/star';
import { useNavigate } from 'react-router-dom';

interface PropsType {
	data: StarData;
	onClick: () => void;
	isSelected: boolean;
}

export default function Post({ data, onClick, isSelected }: PropsType) {
	const { targetView, setTargetView } = useCameraStore();
	const { view, setView } = useViewStore();

	const meshRef = useRef<THREE.Mesh>(null!);

	const navigate = useNavigate();

	const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		onClick();

		if (meshRef.current !== targetView) {
			setView('DETAIL');
			setTargetView(meshRef.current);
			navigate(`/home/${data.id}`);
			return;
		}

		navigate(`/home/${data.id}/detail`);
		setView('POST');
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
		>
			{view === 'DETAIL' && isSelected && (
				<Html>
					<Label>{data.title}</Label>
				</Html>
			)}
		</Star>
	);
}

const Label = styled.div`
	transform: translate3d(calc(-50%), calc(-250%), 0); // TODO: 수정 예정
	background-color: #fff;
	opacity: 0.5;
	padding: 10px 15px;
	border-radius: 5px;
	width: fit-content;
	max-width: 200px; // TODO: 수정 예정
	text-align: center;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
