import { Modal } from 'shared/ui';
import { TopButton, LeftButton, RightButton, LoginContent } from './ui';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@constants';
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function LoginModal() {
	const [id, setId] = useState(Cookies.get('userId') ?? '');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLoginSubmit = () => {
		if (id.length && password.length === 0) return;
		const data = {
			username: id,
			password: password,
		};
		// setPassword('');
		axios.post(BASE_URL + 'auth/signin', data).then((res) => {
			if (res.status === 200) {
				Cookies.set('userId', id, { path: '/', expires: 3 });
				Cookies.set('refreshToken', res.data.refreshToken, {
					path: '/',
					secure: true,
					expires: 3 / 24,
				});
				Cookies.set('accessToken', res.data.accessToken, {
					path: '/',
					secure: true,
					expires: 3 / 24,
				});
				navigate('/home');
			} else console.log(res.status);
		});
	};
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleLoginSubmit();
			}}
		>
			<Modal
				title="로그인"
				topButton={<TopButton onClick={() => navigate('/')} />}
				rightButton={<RightButton disabled={!(id.length && password.length)} />}
				leftButton={<LeftButton onClick={() => navigate('/signup')} />}
				onClickGoBack={() => navigate('/')}
				style={{ width: '516px' }}
			>
				<LoginContent
					useId={[id, setId]}
					usePassword={[password, setPassword]}
				/>
			</Modal>
		</form>
	);
}
