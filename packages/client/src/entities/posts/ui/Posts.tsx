import Post from './Post';
import { useState } from 'react';
import { StarData } from 'shared/lib/types/star';
import { useOwnerStore } from 'shared/store/useOwnerStore';
import { getPostListByNickName } from 'shared/apis/star';
import { useEffect } from 'react';
import { useViewStore } from 'shared/store';
import { getMyPost } from '../apis/getMyPost';

export default function Posts() {
	const [postData, setPostData] = useState<StarData[]>();

	const { isMyPage, pageOwnerNickName } = useOwnerStore();
	const { view } = useViewStore();

	useEffect(() => {
		if (view !== 'MAIN') return;

		if (isMyPage) {
			(async () => {
				const myPostData = await getMyPost();
				setPostData(myPostData);
			})();
			return;
		}

		(async () => {
			const otherPostData = await getPostListByNickName(pageOwnerNickName);
			setPostData(otherPostData);
		})();
	}, [isMyPage, view]);

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
