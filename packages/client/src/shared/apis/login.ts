import instance from './core/AxiosInterceptor';

interface PostLoginTypes {
	username: string;
	password: string;
}

export const postLogin = async ({ username, password }: PostLoginTypes) => {
	const { data } = await instance({
		method: 'POST',
		url: '/auth/signin',
		data: {
			username,
			password,
		},
	});

	return data;
};

export const getSignInInfo = async () => {
	const { data } = await instance({
		method: 'GET',
		url: `/auth/check-signin`,
	});

	return data;
};
