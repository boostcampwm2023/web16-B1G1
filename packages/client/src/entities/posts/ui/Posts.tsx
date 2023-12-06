import { useFetch } from 'shared/hooks';
import Post from './Post';
import { useState } from 'react';
import { StarData } from 'shared/lib/types/star';
import { useOwnerStore } from 'shared/store/useOwnerStore';
import { getPostListByNickName } from 'shared/apis/star';
import { useEffect } from 'react';
import { useViewStore } from 'shared/store';

export default function Posts() {
	const [postData, setPostData] = useState<StarData[]>();

	const { isMyPage, pageOwnerNickName } = useOwnerStore();
	const { view } = useViewStore();

	const myPostData = useFetch<StarData[]>('star').data;

	useEffect(() => {
		if (view !== 'MAIN') return;

		if (isMyPage) {
			setPostData(myPostData);
			return;
		}

		(async () => {
			const otherPostData = await getPostListByNickName(pageOwnerNickName);
			setPostData(otherPostData);
		})();
	}, [isMyPage, myPostData, view]);

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
