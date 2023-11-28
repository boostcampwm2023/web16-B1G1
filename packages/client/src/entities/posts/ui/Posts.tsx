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
