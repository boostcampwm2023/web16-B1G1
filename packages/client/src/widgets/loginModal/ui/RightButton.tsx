import { Button } from 'shared/ui';
import { useLoginStore } from 'shared/store/userLoginStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@constants';

export default function RightButton() {
	const { id, password } = useLoginStore();

	return (
		<Button
			size="m"
			buttonType="CTA-icon"
			disabled={!(id.length && password.length)}
			type="submit"
		>
			로그인
		</Button>
	);
}
