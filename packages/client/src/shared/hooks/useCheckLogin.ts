import { useEffect } from 'react';
import { BASE_URL } from '@constants';
import { useNavigate } from 'react-router-dom';
import instance from 'shared/apis/AxiosInterceptor';

export const useCheckLogin = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const checkLogin = async () => {
			try {
				const res = await instance.get(`${BASE_URL}auth/check-signin`);
				if (res.status === 200) {
					navigate('/home');
				}
			} catch (error) {
				console.error(error);
			}
		};
		checkLogin();
	}, []);
};
