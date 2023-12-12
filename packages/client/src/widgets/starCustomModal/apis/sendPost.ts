import { instance } from 'shared/apis';

export const sendPost = async (formData: FormData) => {
	const response = await instance({
		method: 'POST',
		url: '/post',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return response;
};
