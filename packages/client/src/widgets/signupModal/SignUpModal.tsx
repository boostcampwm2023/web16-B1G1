import styled from '@emotion/styled';
import { Button, Modal } from 'shared/ui';
import { useState, useEffect } from 'react';
import IdInputContainer from './ui/IdInputContainer';
import PwInputContainer from './ui/PwInputContainer';
import CheckPwInputContainer from './ui/CheckPwInputContainer';

interface PropsType {
	changePage: React.Dispatch<{ type: 'NEXT' | 'PREV' }>;
}

export default function SignUpModal({ changePage }: PropsType) {
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

	// const handleGoBackButton = () => {
	// 	// TODO: 로그인 모달로 이동하도록 하기
	// };

	const handleSignUpButton = () => {
		if (!isAllInputValid) return;

		// TODO: 회원가입 요청 보낸 후 로그인 모달로 이동
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
			onClickGoBack={() => changePage({ type: 'PREV' })}
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
