import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { BackgroundStars } from 'features';
import { useEffect, useRef } from 'react';
import { Group, Object3DEventMap } from 'three';
import { Galaxy } from 'widgets/galaxy/index.ts';
import { CAMERA_FAR, CAMERA_POSITION, CAMERA_UP } from './lib/camera.ts';
import theme from 'shared/styles/theme.ts';

export default function LandingScreen() {
	const galaxyRef = useRef<Group<Object3DEventMap>>(null!);
	const camera = {
		position: CAMERA_POSITION,
		up: CAMERA_UP,
		far: CAMERA_FAR,
	};

	useEffect(() => {
		const mouseHandler = (e: MouseEvent) => {
			const mouseX = e.clientX / window.innerWidth;
			const mouseY = e.clientY / window.innerHeight;
			galaxyRef.current.rotation.x = (mouseY - 0.5) / 5;
			galaxyRef.current.rotation.y = (mouseX - 0.5) / 5;
		};

		window.addEventListener('mousemove', mouseHandler);

		return () => window.removeEventListener('mousemove', mouseHandler);
	}, []);

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas camera={camera}>
				<EffectComposer>
					<Bloom
						intensity={0.4}
						mipmapBlur={false}
						luminanceThreshold={0.9}
						luminanceSmoothing={0.025}
					/>
				</EffectComposer>

				<color attach="background" args={[theme.colors.background.bdp04]} />
				<ambientLight color="#fff" intensity={5} />
				<BackgroundStars />
				<group ref={galaxyRef}>
					<Galaxy />
				</group>
			</Canvas>
		</div>
	);
}
