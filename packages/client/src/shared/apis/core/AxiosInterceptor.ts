import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useCheckNickName from 'shared/hooks/useCheckNickName';
import { errorMessage } from 'shared/lib/constants/error';
import { useToastStore } from 'shared/store';

const instance = axios.create({
	baseURL: 'https://www.별글.site/api/',
	withCredentials: true,
});

interface Props {
	children: JSX.Element;
}

type MethodType = 'get' | 'post' | 'patch' | 'delete';

function AxiosInterceptor({ children }: Props) {
	const { setToast } = useToastStore();

	useEffect(() => {
		const responseInterceptor = instance.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				const method: MethodType = error.config.method;
				const url: string = error.config.url.split('?')[0];

				// TODO: '/auth/is-available-nickname'  부분 처리하기

				setToast({ text: errorMessage[method][url], type: 'error' });

				console.error(error.response.data);
				return Promise.reject(error);
			},
		);

		const requestInterceptor = instance.interceptors.request.use(
			(config) => {
				return config;
			},
			(error) => {
				console.error(error.response.data);
				return Promise.reject(error);
			},
		);

		return () => {
			instance.interceptors.request.eject(requestInterceptor);
			instance.interceptors.response.eject(responseInterceptor);
		};
	}, []);

	return children;
}

export default instance;
export { AxiosInterceptor };
