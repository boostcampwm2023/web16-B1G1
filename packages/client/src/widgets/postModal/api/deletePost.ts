import { instance } from 'shared/apis';

export const deletePost = async (postId: string) => {
	const res = await instance({
		method: 'DELETE',
		url: `/post/${postId}`,
	});

	return res;
};
