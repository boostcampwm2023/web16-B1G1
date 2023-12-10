import instance from './core/AxiosInterceptor';

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

interface GalaxyStyle {
	spiral?: number;
	start?: number;
	zDist?: number;
	thickness?: number;
}

export const postGalaxy = async (galaxyStyle: GalaxyStyle) => {
	const { data } = await instance({
		method: 'PATCH',
		url: `/galaxy`,
		data: galaxyStyle,
	});

	return data;
};
