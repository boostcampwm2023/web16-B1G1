export default function BrightSphere() {
	return (
		<mesh position={[0, 0, 0]}>
			<sphereGeometry attach="geometry" args={[600, 32, 32]} />
			<meshStandardMaterial attach="material" color="white" />
		</mesh>
	);
}
