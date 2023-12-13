import goBackIcon from '@icons/icon-back-32-white.svg';
import { useNavigate } from 'react-router-dom';
import { IconButton } from 'shared/ui';

interface PropsTypes {
	page: string;
}

export default function GoBackButton({ page }: PropsTypes) {
	const navigate = useNavigate();

	const handleGoBackButton = () => {
		if (page === 'guest') return navigate('/');
		navigate('/home');
	};

	const iconButtonVisibility = page === 'home' ? 'hidden' : 'visible';

	return (
		<IconButton
			onClick={handleGoBackButton}
			style={{ visibility: iconButtonVisibility }}
		>
			<img src={goBackIcon} alt="뒤로가기" />
		</IconButton>
	);
}
