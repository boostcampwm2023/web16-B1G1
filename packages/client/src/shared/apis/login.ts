import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { useScreenSwitchStore } from 'shared/store/useScreenSwitchStore';
import instance from './AxiosInterceptor';

axios.defaults.withCredentials = true;

export const postLogin = async (
	data: {
		username: string;
		password: string;
	},
	setIdState: React.Dispatch<React.SetStateAction<boolean>>,
	setPasswordState: React.Dispatch<React.SetStateAction<boolean>>,
	navigate: NavigateFunction,
) => {
	try {
		await instance({
			method: 'POST',
			url: '/auth/signin',
			data,
		});
		Cookies.set('userId', data.username, { path: '/', expires: 7 });
		navigate('/home');
		useScreenSwitchStore.setState({ isSwitching: true });
	} catch (err) {
		if (err instanceof AxiosError) {
			if (err.response?.status === 404) setIdState(false);
			else if (err.response?.status === 401) setPasswordState(false);
			else alert(err);
		} else alert(err);
	}
};

export const getSignInInfo = async () => {
	const { data } = await instance({
		method: 'GET',
		url: `/auth/check-signin`,
	});

	return data;
};
