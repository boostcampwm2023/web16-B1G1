import { instance } from 'shared/apis';
import { StarData } from 'shared/lib';

export const getMyPost = async (): Promise<StarData[]> => {
	const { data } = await instance({
		method: 'GET',
		url: '/star',
	});
	return data;
};
