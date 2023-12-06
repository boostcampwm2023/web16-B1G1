import instance from './AxiosInterceptor';

export const getGalaxy = async (nickname: string) => {
	if (nickname !== '') {
		const { data } = await instance({
			method: 'GET',
			url: `/galaxy/by-nickname?nickname=${nickname}`,
		});
		return data;
	}
	const { data } = await instance({
		method: 'GET',
		url: `/galaxy`,
	});

	return data;
};

export const postGalaxy = async (galaxyStyle: Object) => {
	const { data } = await instance({
		method: 'PATCH',
		url: `/galaxy`,
		data: galaxyStyle,
	});

	return data;
};
