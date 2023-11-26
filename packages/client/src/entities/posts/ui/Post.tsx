import Star from 'features/star';
import { useRef } from 'react';
import { useCameraStore } from 'shared/store/useCameraStore';
import { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from '@emotion/styled';
import { useViewStore } from 'shared/store/useViewStore';
import * as THREE from 'three';
import { PostData } from 'shared/lib/types/post';
import { usePostStore } from 'shared/store/usePostStore';

interface PropsType {
	data: PostData;
	onClick: () => void;
	isSelected: boolean;
}

export default function Post({ data, onClick, isSelected }: PropsType) {
	const { targetView, setTargetView } = useCameraStore();
	const meshRef = useRef<THREE.Mesh>(null!);
	const { view, setView } = useViewStore();
	const { setData } = usePostStore();

	const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		onClick();

		if (meshRef.current !== targetView) {
			setView('DETAIL');
			setTargetView(meshRef.current);
			return;
		}

		setData(data);
		setView('POST');
	};

	return (
		<Star
			position={data.position}
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
