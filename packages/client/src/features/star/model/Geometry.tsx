import { ShapeType } from '@constants';

interface PropsType {
	shape?: ShapeType;
	size: number;
}

export default function Geometry({ shape = 'Sphere', size }: PropsType) {
	switch (shape) {
		case 'Sphere':
			return <sphereGeometry args={[size, 32, 16]} />;
		case 'Box':
			return <boxGeometry args={[size, size, size]} />;
		case 'Dodeca':
			return <dodecahedronGeometry args={[size]} />;
		case 'Icosa':
			return <icosahedronGeometry args={[size]} />;
		case 'Octa':
			return <octahedronGeometry args={[size]} />;
		case 'Tetra':
			return <tetrahedronGeometry args={[size]} />;
		case 'Torus':
			return <torusGeometry args={[size, size / 3, 16, 64]} />;
		case 'TorusKnot':
			return <torusKnotGeometry args={[size, size / 2.5, 128, 16, 2, 3]} />;
		case 'TorusKnot2':
			return <torusKnotGeometry args={[size, size / 2, 200, 200, 3, 5]} />;
		case 'TorusKnot3':
			return <torusKnotGeometry args={[size, size / 2, 85, 20, 2, 1]} />;
		case 'TorusKnot4':
			return <torusKnotGeometry args={[size, size / 2, 48, 8, 1, 6]} />;
		case 'TorusKnot5':
			return <torusKnotGeometry args={[size, size / 2, 29, 20, 10, 8]} />;
		case 'TorusKnot6':
			return <torusKnotGeometry args={[size, size / 2, 15, 8, 8, 7]} />;
		case 'TorusKnot7':
			return <torusKnotGeometry args={[size, size / 2, 26, 4, 5, 11]} />;
	}
}
