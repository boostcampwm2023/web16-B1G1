import instance from './AxiosInterceptor';

export const getNickNames = async (nickName: string) => {
	const { data } = await instance({
		method: 'GET',
		url: `/auth/search?nickname=${nickName}`,
	});

	return data;
};