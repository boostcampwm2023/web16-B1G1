import { Button } from 'shared/ui';
import { useLoginStore } from 'shared/store/userLoginStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://www.별글.site/api/';

export default function RightButton() {
	const { id, password, setPassword } = useLoginStore();
	const navigate = useNavigate();

	const handleLoginClick = () => {
		const data = {
			username: id,
			password: password,
		};
		setPassword('');
		axios.post(BASE_URL + 'auth/signin', data).then((res) => {
			if (res.status === 200) navigate('/home');
			else console.log(res.status);
		});
	};

	return (
		<Button
			onClick={handleLoginClick}
			size="m"
			buttonType="CTA-icon"
			disabled={!(id.length && password.length)}
		>
			로그인
		</Button>
	);
}
