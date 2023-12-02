import instance from 'shared/apis/AxiosInterceptor';
import { BASE_URL } from '@constants';

export const deletePost = async (postId: string) => {
	const res = await instance({
		method: 'DELETE',
		url: `${BASE_URL}/post/${postId}`,
	});

	return res;
};
