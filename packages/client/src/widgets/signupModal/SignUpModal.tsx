import styled from '@emotion/styled';
import { Button, Modal } from 'shared/ui';
import { useState, useEffect } from 'react';
import IdInputContainer from './ui/IdInputContainer';
import PwInputContainer from './ui/PwInputContainer';
import CheckPwInputContainer from './ui/CheckPwInputContainer';
import { useSignUpStore } from 'shared/store/useSignUpStore';
import { useNavigate } from 'react-router-dom';

export default function SignUpModal() {
	const navigate = useNavigate();

	const [validId, setValidId] = useState('');
	const [validPw, setValidPw] = useState('');
	const [validCheckPw, setValidCheckPw] = useState('');

	const [isAllInputValid, setIsAllInputValid] = useState(false);

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

		useSignUpStore.setState({
			id: validId,
			pw: validPw,
		});

		navigate('/nickname');
	};

	const signUpButton = (
		<Button
			onClick={handleSignUpButton}
			buttonType="CTA-icon"
			size="m"
			disabled={!isAllInputValid}
		>
			회원가입
		</Button>
	);

	return (
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
	);
}

const InputBarsContainer = styled.div`
	width: 452px;

	& > * + * {
		margin: 24px 0 0 0;
	}
`;
