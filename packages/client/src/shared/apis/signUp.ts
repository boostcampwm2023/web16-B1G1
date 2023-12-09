import instance from './core/AxiosInterceptor';

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
	username?: string;
	password?: string;
	nickname: string;
	platform?: string;
}

export const postSignUp = async ({
	username,
	password,
	nickname,
	platform,
}: PostSignUpTypes) => {
	if (!platform) {
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
	} else {
		const { data } = await instance({
			method: 'POST',
			url: `/auth/${platform}/signup`,
			data: {
				nickname,
			},
		});
		return data;
	}
};
