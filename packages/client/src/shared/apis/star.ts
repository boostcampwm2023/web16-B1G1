import instance from './AxiosInterceptor';

export const getPostListByNickName = async (nickName: string) => {
	const { data } = await instance({
		method: 'GET',
		url: `/star/by-author?author=${nickName}`,
	});

	return data;
};
