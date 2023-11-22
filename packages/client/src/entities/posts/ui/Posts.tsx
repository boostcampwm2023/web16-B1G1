import Post from './Post';
import * as THREE from 'three';

export default function Posts() {
	return (
		<>
			{dummyData.map((data, index) => (
				<Post
					key={index}
					position={data.position}
					size={data.size}
					color={data.color}
					label={data.label}
				/>
			))}
		</>
	);
}

const dummyData = [
	{
		position: new THREE.Vector3(1000, 1000, 1800),
		size: 100,
		color: 'red',
		label: '별글입니당',
	},
	{
		position: new THREE.Vector3(1300, 500, 1000),
		size: 200,
		color: 'blue',
		label: '별글입니당',
	},
	{
		position: new THREE.Vector3(3000, 1000, 2500),
		size: 150,
		color: 'yellow',
		label: '별글입니당',
	},
]; // TODO: 서버로부터 받아온 데이터로 변경 필요
