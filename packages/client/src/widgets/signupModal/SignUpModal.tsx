import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from 'shared/store';
import { Button, Modal } from 'shared/ui';
import CheckPwInputContainer from './ui/CheckPwInputContainer';
import IdInputContainer from './ui/IdInputContainer';
import PwInputContainer from './ui/PwInputContainer';

export default function SignUpModal() {
	const navigate = useNavigate();

	const [validId, setValidId] = useState('');
	const [validPw, setValidPw] = useState('');
	const [validCheckPw, setValidCheckPw] = useState('');

	const [isAllInputValid, setIsAllInputValid] = useState(false);

	const { setId, setPw } = useSignUpStore();

	useEffect(() => {
		if (validId && validPw && validCheckPw) {
			setIsAllInputValid(true);
			return;
		}

		setIsAllInputValid(false);
	}, [validId, validPw, validCheckPw]);

	const handleGoBackButton = () => navigate('/login');

	const handleSignUpButton = () => {
		if (!isAllInputValid) return;

		setId(validId);
		setPw(validPw);

		navigate('/nickname');
	};

	const signUpButton = (
		<Button
			onClick={handleSignUpButton}
			buttonType="CTA-icon"
			size="m"
			type="submit"
			disabled={!isAllInputValid}
		>
			회원가입
		</Button>
	);

	return (
		<form>
			<Modal
				title="회원가입"
				rightButton={signUpButton}
				onClickGoBack={handleGoBackButton}
			>
				<InputBarsContainer>
					<IdInputContainer setValidId={setValidId} />
					<PwInputContainer setValidPw={setValidPw} />
					<CheckPwInputContainer
						validPw={validPw}
						setValidCheckPw={setValidCheckPw}
					/>
				</InputBarsContainer>
			</Modal>
		</form>
	);
}

const InputBarsContainer = styled.div`
	width: 452px;

	& > * + * {
		margin: 24px 0 0 0;
	}
`;
