import { useEffect, useState } from 'react';
import { getPostListByNickName } from 'shared/apis';
import { useCheckNickName } from 'shared/hooks';
import { StarData } from 'shared/lib';
import { useViewStore } from 'shared/store';
import { getMyPost } from '../apis/getMyPost';
import Post from './Post';

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
