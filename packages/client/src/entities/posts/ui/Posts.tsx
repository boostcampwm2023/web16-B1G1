import Post from './Post';
import { useState, useEffect } from 'react';
import { StarData } from 'shared/lib/types/star';
import { getPostListByNickName } from 'shared/apis/star';
import { getMyPost } from '../apis/getMyPost';
import useCheckNickName from 'shared/hooks/useCheckNickName';
import { useViewStore } from 'shared/store';

export default function Posts() {
	const [postData, setPostData] = useState<StarData[]>();
	const { view } = useViewStore();

	const { page, nickName } = useCheckNickName();

	useEffect(() => {
		if (!page) return;
		if (!nickName) return;

		if (page === 'home') {
			getMyPost().then((res) => setPostData(res));
		} else {
			getPostListByNickName(nickName).then((res) => setPostData(res));
		}
	}, [view, nickName]);

	return (
		<group>
			{postData &&
				postData.map((data, index) => (
					<Post
						key={index}
						data={data.star}
						postId={data.id}
						title={data.title}
					/>
				))}
		</group>
	);
}
