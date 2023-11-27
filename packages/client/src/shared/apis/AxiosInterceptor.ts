import axios from 'axios';
import { useEffect } from 'react';

const instance = axios.create({
	baseURL: 'https://www.별글.site/api/',
});

interface Props {
	children: JSX.Element;
}

function AxiosInterceptor({ children }: Props) {
	useEffect(() => {
		const responseInterceptor = instance.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
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
