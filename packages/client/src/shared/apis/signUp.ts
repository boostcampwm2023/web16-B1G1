import instance from './AxiosInterceptor';

interface PostSignUpTypes {
	username: string;
	password: string;
	nickname: string;
}

export const postSignUp = async ({
	username,
	password,
	nickname,
}: PostSignUpTypes) => {
	const { data } = await instance({
		method: 'POST',
		url: '/auth/signup',
		data: {
			username,
			password,
			nickname,
		},
	});

	return data;
};
