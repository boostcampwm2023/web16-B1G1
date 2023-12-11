import instance from 'shared/apis/core/AxiosInterceptor';

export const getSentimentColor = async (content: string) => {
	const response = await instance({
		method: 'POST',
		url: '/sentiment',
		data: { content },
	});

	return response;
};