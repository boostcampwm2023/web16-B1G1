import { Modal } from 'shared/ui';
import { TopButton, LeftButton, RightButton, LoginContent } from './ui';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { postLogin } from 'shared/apis';

export default function LoginModal() {
	const [id, setId] = useState(Cookies.get('userId') ?? '');
	const [idState, setIdState] = useState(true);
	const [password, setPassword] = useState('');
	const [passwordState, setPasswordState] = useState(true);
	const navigate = useNavigate();

	const isValid = () => {
		return id.length && password.length && idState && passwordState;
	};

	const handleLoginSubmit = () => {
		if (!isValid()) return;
		const data = {
			username: id,
			password: password,
		};
		setPassword('');
		postLogin(data, setIdState, setPasswordState, navigate);
	};

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		const refreshToken = Cookies.get('refreshToken');
		if (refreshToken || accessToken) navigate('/home');
	});

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
				rightButton={<RightButton disabled={!isValid()} />}
				leftButton={<LeftButton onClick={() => navigate('/signup')} />}
				onClickGoBack={() => navigate('/')}
				style={{ width: '516px' }}
			>
				<LoginContent
					useId={[id, setId]}
					useIdState={[idState, setIdState]}
					usePassword={[password, setPassword]}
					usePasswordState={[passwordState, setPasswordState]}
				/>
			</Modal>
		</form>
	);
}
