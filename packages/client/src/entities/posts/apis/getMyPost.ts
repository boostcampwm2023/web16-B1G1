import instance from 'shared/apis/AxiosInterceptor';

export const getMyPost = async () => {
	const { data } = await instance({
		method: 'GET',
		url: '/star',
	});
	return data;
};
