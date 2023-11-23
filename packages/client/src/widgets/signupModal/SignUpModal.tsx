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
	const [isAllInputFilled, setIsAllInputFilled] = useState(false);

	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');

	useEffect(() => {
		if (id && password && checkPassword) {
			setIsAllInputFilled(true);
			return;
		}

		setIsAllInputFilled(false);
	}, [id, password, checkPassword]);

	// const handleGoBackButton = () => {
	// 	// TODO: 로그인 모달로 이동하도록 하기
	// };

	const handleSignUpButton = () => {
		if (!isAllInputFilled) return;

		// TODO: 회원가입 요청 보낸 후 로그인 모달로 이동
	};

	const signUpButton = (
		<Button
			onClick={handleSignUpButton}
			buttonType="CTA-icon"
			size="m"
			disabled={!isAllInputFilled}
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
				<IdInputContainer state={id} setState={setId} />
				<PwInputContainer state={password} setState={setPassword} />
				<CheckPwInputContainer
					pwState={password}
					checkPwstate={checkPassword}
					setCheckPwState={setCheckPassword}
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
