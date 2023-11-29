import instance from 'shared/apis/AxiosInterceptor';

export const deletePost = async (postId: string) => {
	const { data } = await instance({
		method: 'DELETE',
		url: `/post/${postId}`,
	});

	return data;
};
