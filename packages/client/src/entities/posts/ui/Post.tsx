import styled from '@emotion/styled';
import { Html } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { Star } from 'features';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StarType } from 'shared/lib';
import { useCameraStore, useViewStore } from 'shared/store';
import * as THREE from 'three';

interface PropsType {
	data: StarType;
	postId: number;
	title: string;
}

export default function Post({ data, postId, title }: PropsType) {
	const { targetView, setTargetView } = useCameraStore();
	const { setView } = useViewStore();

	const meshRef = useRef<THREE.Mesh>(null!);
	const [isHovered, setIsHovered] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const { postId: id } = useParams();

	useEffect(() => {
		if (id && Number(id) === postId) setTargetView(meshRef.current);
	}, [id]);

	const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();

		const splitedPath = location.pathname.split('/');
		const page = splitedPath[1];
		const nickName = splitedPath[2];
		let path = '/';
		if (page === 'home') path += page + '/';
		else path += page + '/' + nickName + '/';

		if (meshRef.current !== targetView) {
			setView('DETAIL');
			setTargetView(meshRef.current);
			return navigate(path + postId);
		}

		setView('POST');
		navigate(path + postId + '/detail');
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
			{isHovered && (
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
	background-color: ${({ theme: { colors } }) => colors.background.bdp01_80};
	border: ${({ theme: { colors } }) => colors.stroke.sc};
	color: ${({ theme: { colors } }) => colors.text.secondary};
	transform: translate3d(calc(-50%), calc(-250%), 0); // TODO: 수정 예정

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
