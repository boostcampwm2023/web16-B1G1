import { instance } from 'shared/apis';

export const getSentimentColor = async (content: string) => {
	const response = await instance({
		method: 'POST',
		url: '/sentiment',
		data: { content },
	});

	return response;
};
