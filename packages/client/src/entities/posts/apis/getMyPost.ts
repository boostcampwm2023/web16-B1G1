import instance from 'shared/apis/core/AxiosInterceptor';
import { StarData } from 'shared/lib/types/star';

export const getMyPost = async (): Promise<StarData[]> => {
	const { data } = await instance({
		method: 'GET',
		url: '/star',
	});
	return data;
};
