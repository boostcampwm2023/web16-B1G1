import { useFetch } from 'shared/hooks';
import Post from './Post';
import { useState } from 'react';
import { StarData } from 'shared/lib/types/star';
import { useOwnerStore } from 'shared/store/useOwnerStore';
import { getPostListByNickName } from 'shared/apis/star';
import { useEffect } from 'react';

export default function Posts() {
	const [post, setPost] = useState(0);
	const [postData, setPostData] = useState<StarData[]>();

	const { isMyPage, pageOwnerNickName } = useOwnerStore();

	const myPostData = useFetch<StarData[]>('star').data;

	useEffect(() => {
		if (isMyPage) {
			setPostData(myPostData);
			return;
		}

		(async () => {
			const otherPostData = await getPostListByNickName(pageOwnerNickName);
			setPostData(otherPostData);
		})();
	}, [isMyPage, myPostData]);

	return (
		<>
			{postData &&
				postData.map((data, index) => (
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
