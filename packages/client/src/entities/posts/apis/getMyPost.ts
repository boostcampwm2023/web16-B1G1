import instance from 'shared/apis/core/AxiosInterceptor';

export const getMyPost = async () => {
	const { data } = await instance({
		method: 'GET',
		url: '/star',
	});
	return data;
};
