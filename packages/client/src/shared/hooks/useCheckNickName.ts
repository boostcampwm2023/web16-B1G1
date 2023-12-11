import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSignInInfo } from 'shared/apis';
import { getShareLinkHostNickName } from 'shared/apis/share';
import Cookies from 'js-cookie';

export default function useCheckNickName() {
	const location = useLocation();
	const [page, setPage] = useState('');
	const [nickName, setNickName] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		const path = location.pathname.split('/')[1];
		const hostNickName = location.pathname.split('/')[2];

		switch (path) {
			case 'home':
				setPage('home');
				(async () => {
					const res = await getSignInInfo();
					setNickName(res.nickname);
					setStatus(res.status);
					Cookies.set('userName', res.nickname);
				})();
				break;

			case 'search':
				setPage('search');
				setNickName(hostNickName);
				break;

			case 'guest':
				setPage('guest');
				(async () => {
					const res = await getShareLinkHostNickName(hostNickName);
					setNickName(res);
				})();
				break;
			default:
				break;
		}
	}, [location]);

	return { page, nickName, status };
}
