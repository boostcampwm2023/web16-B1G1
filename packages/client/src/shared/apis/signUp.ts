import instance from './AxiosInterceptor';

export const getIsAvailableUsername = async (username: string) => {
	const { data } = await instance({
		method: 'GET',
		url: `/auth/is-available-username?username=${username}`,
	});

	return data;
};

export const getIsAvailableNickName = async (nickname: string) => {
	const { data } = await instance({
		method: 'GET',
		url: `/auth/is-available-nickname?nickname=${nickname}`,
	});

	return data;
};

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
