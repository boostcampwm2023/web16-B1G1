import { useFetch } from 'shared/hooks';
import Post from './Post';
import { useState } from 'react';
import { StarData } from 'shared/lib/types/star';

export default function Posts() {
	const [post, setPost] = useState(0);
	const { data } = useFetch<StarData[]>('star');

	return (
		<>
			{data &&
				data.map((data, index) => (
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

// const dummyData = [
// 	{
// 		position: new THREE.Vector3(1000, 1000, 1800),
// 		size: 100,
// 		color: 'red',
// 		title: '별글입니당',
// 	},
// 	{
// 		position: new THREE.Vector3(1300, 500, 1000),
// 		size: 200,
// 		color: 'blue',
// 		title: '별글입니당',
// 	},
// 	{
// 		position: new THREE.Vector3(3000, 1000, 2500),
// 		size: 150,
// 		color: 'yellow',
// 		title: '별글입니당',
// 	},
// ]; // TODO: 서버로부터 받아온 데이터로 변경 필요
