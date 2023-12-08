import Post from './Post';
import { useState } from 'react';
import { StarData } from 'shared/lib/types/star';
import { getPostListByNickName } from 'shared/apis/star';
import { useEffect } from 'react';
import { getMyPost } from '../apis/getMyPost';
import useCheckNickName from 'shared/hooks/useCheckNickName';

export default function Posts() {
	const [postData, setPostData] = useState<StarData[]>();

	const { page, nickName } = useCheckNickName();

	useEffect(() => {
		if (page === 'home') {
			(async () => {
				const myPostData = await getMyPost();
				setPostData(myPostData);
			})();
			return;
		}

		(async () => {
			const otherPostData = await getPostListByNickName(nickName);
			setPostData(otherPostData);
		})();
	}, [page, nickName]);

	return (
		<>
			{postData &&
				postData.map((data, index) => (
					<Post
						key={index}
						data={data.star}
						postId={data.id}
						title={data.title}
					/>
				))}
		</>
	);
}
