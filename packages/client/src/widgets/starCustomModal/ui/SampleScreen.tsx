import { shapeTypes } from '@constants';
import styled from '@emotion/styled';
import leftArrowIcon from '@icons/icon-arrow-left-32-white.svg';
import rightArrowIcon from '@icons/icon-arrow-right-32-white.svg';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Star } from 'features';
import { theme } from 'shared/styles';
import * as THREE from 'three';

interface PropsType {
	shape: number;
	setShape: React.Dispatch<React.SetStateAction<number>>;
	color: string;
	size: number;
	brightness: number;
}

export default function SampleScreen({
	shape,
	setShape,
	color,
	size,
	brightness,
}: PropsType) {
	const changeShapePrevious = () => {
		if (shape === 0) {
			setShape(shapeTypes.length - 1);
			return;
		}
		setShape(shape - 1);
	};

	const changeShapeNext = () => {
		if (shape === shapeTypes.length - 1) {
			setShape(0);
			return;
		}
		setShape(shape + 1);
	};

	return (
		<Layout>
			<LeftArrowIcon
				src={leftArrowIcon}
				alt="이전 별 모양 보기"
				height={35}
				width={35}
				onClick={changeShapePrevious}
			/>
			<RightArrowIcon
				src={rightArrowIcon}
				alt="다음 별 모양 보기"
				height={35}
				width={35}
				onClick={changeShapeNext}
			/>

			<Canvas camera={{ position: [0, 0, 750], far: 10000 }}>
				<EffectComposer>
					<Bloom
						intensity={0.4}
						mipmapBlur={false}
						luminanceThreshold={0.9}
						luminanceSmoothing={0.025}
					/>
				</EffectComposer>

				<color attach="background" args={[theme.colors.background.bdp04]} />

				<directionalLight color={'#fff'} intensity={4} />
				<ambientLight color="#fff" intensity={1} />

				<Star
					position={new THREE.Vector3(0, 0, 0)}
					size={size}
					color={color}
					shape={shapeTypes[shape]}
					brightness={brightness}
				/>

				<OrbitControls enableZoom={false} />
			</Canvas>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	position: relative;
	height: 400px;
	width: 400px;
`;

const LeftArrowIcon = styled.img`
	position: absolute;
	z-index: 20;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
`;

const RightArrowIcon = styled(LeftArrowIcon)`
	right: 0;
`;
