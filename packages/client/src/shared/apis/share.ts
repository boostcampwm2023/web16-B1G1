import instance from './AxiosInterceptor';

export const getShareLink = async (nickName: string) => {
	const { data } = await instance({
		method: 'GET',
		url: `/auth/sharelink?nickname=${nickName}`,
	});

	return data;
};
