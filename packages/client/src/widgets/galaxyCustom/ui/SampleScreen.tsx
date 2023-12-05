import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Galaxy } from 'widgets/galaxy';

export default function SampleScreen() {
	return (
		<div style={{ height: '480px', width: '480px' }}>
			<Canvas
				camera={{
					position: [0, 20000, 0],
					far: 50000,
				}}
			>
				<EffectComposer>
					<Bloom
						intensity={0.4}
						mipmapBlur={false}
						luminanceThreshold={0.9}
						luminanceSmoothing={0.025}
					/>
				</EffectComposer>
				<color attach="background" args={['#070614']} />
				<ambientLight color="#fff" intensity={5} />
				<Galaxy number={2000} isCustom={true} />
			</Canvas>
		</div>
	);
}
