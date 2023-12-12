import instance from './core/AxiosInterceptor';

export const getNickNames = async (nickName: string) => {
	const { data } = await instance({
		method: 'GET',
		url: `/auth/search?nickname=${nickName}`,
	});

	return data;
};

export const checkExistNickname = async (nickName: string) => {
	const { data } = await instance({
		method: 'GET',
		url: `/auth/check-nickname?nickname=${nickName}`,
	});
	return data;
};
