import { Modal } from 'shared/ui';
import { TopButton, LeftButton, RightButton, LoginContent } from './ui';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { postLogin } from 'shared/apis';
import { useScreenSwitchStore } from 'shared/store/useScreenSwitchStore';
import { AxiosError } from 'axios';

export default function LoginModal() {
	const [id, setId] = useState(Cookies.get('userId') ?? '');
	const [idState, setIdState] = useState(true);
	const [password, setPassword] = useState('');
	const [passwordState, setPasswordState] = useState(true);
	const navigate = useNavigate();
	const { setIsSwitching } = useScreenSwitchStore();

	const isValid = () => {
		return id.length && password.length && idState && passwordState;
	};

	const handleLoginSubmit = async () => {
		if (!isValid()) return;

		setPassword('');

		try {
			await postLogin({ username: id, password });

			Cookies.set('userId', id, { path: '/', expires: 7 });
			navigate('/home');
			setIsSwitching(true);
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 404) setIdState(false);
				else if (err.response?.status === 401) setPasswordState(false);
				else alert(err);
			} else alert(err);
		}
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
