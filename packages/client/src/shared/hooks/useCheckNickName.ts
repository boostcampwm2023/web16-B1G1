import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getShareLinkHostNickName, getSignInInfo } from 'shared/apis';

export function useCheckNickName() {
	const location = useLocation();
	const [page, setPage] = useState('');
	const [nickName, setNickName] = useState('');
	const [status, setStatus] = useState('');
	const { hostNickname } = useParams();

	useEffect(() => {
		const path = location.pathname.split('/')[1];

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
				setNickName(hostNickname!);
				break;

			case 'guest':
				setPage('guest');
				(async () => {
					const res = await getShareLinkHostNickName(hostNickname!);
					setNickName(res);
				})();
				break;
			default:
				break;
		}
	}, [location]);

	return { page, nickName, status };
}
