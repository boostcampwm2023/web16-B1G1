import { useEffect, useState, useMemo } from 'react';
import { getPostListByNickName } from 'shared/apis';
import { useCheckNickName } from 'shared/hooks';
import { StarData } from 'shared/lib';
import { useViewStore } from 'shared/store';
import { getMyPost } from '../apis/getMyPost';
import Post from './Post';

export default function Posts() {
	const [postData, setPostData] = useState<StarData[]>([]);
	const [prevData, setPrevData] = useState<StarData[]>([]);
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

	const PostList = useMemo(() => {
		const prevId = prevData.map((data) => data.id);
		const currentId = postData.map((data) => data.id);

		const list = postData.map((data) => {
			return (
				<Post
					key={data.id}
					data={data.star}
					postId={data.id}
					title={data.title}
					state={prevId.includes(data.id) ? 'normal' : 'created'}
				/>
			);
		});
		prevData
			.filter((data) => !currentId.includes(data.id))
			.forEach((data) =>
				list.push(
					<Post
						key={data.id}
						data={data.star}
						postId={data.id}
						title={data.title}
						state="deleted"
					/>,
				),
			);

		setPrevData([...postData]);

		return list;
	}, [postData]);

	return <group>{PostList}</group>;
}
