import Post from './Post';
import * as THREE from 'three';
import { useState } from 'react';

export default function Posts() {
	const [post, setPost] = useState(0);

	return (
		<>
			{dummyData.map((data, index) => (
				<Post
					key={index}
					data={data}
					onClick={() => setPost(index)}
					isSelected={post === index}
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
		title: '별글입니당',
		content: '# 배가고프다',
		images: [
			'https://github.com/boostcampwm2023/web16-B1G1/assets/35567292/ed205126-f8c5-4f84-98d9-fade19cd6c1d',
		],
	},
	{
		position: new THREE.Vector3(1300, 500, 1000),
		size: 200,
		color: 'blue',
		title: '별글입니당',
		content: '~stroke~',
		images: [
			'https://github.com/boostcampwm2023/web16-B1G1/assets/35567292/ed205126-f8c5-4f84-98d9-fade19cd6c1d',
		],
	},
	{
		position: new THREE.Vector3(3000, 1000, 2500),
		size: 150,
		color: 'yellow',
		title: '별글입니당',
		content: "- I'm hungry",
		images: [
			'https://github.com/boostcampwm2023/web16-B1G1/assets/35567292/ed205126-f8c5-4f84-98d9-fade19cd6c1d',
		],
	},
]; // TODO: 서버로부터 받아온 데이터로 변경 필요
