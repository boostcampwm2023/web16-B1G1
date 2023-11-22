import styled from '@emotion/styled';
import { Button, Modal } from 'shared/ui';
import InputBar from 'shared/ui/inputBar/InputBar';
import { useState } from 'react';

export default function SignupModal() {
	const [isAllInputFilled, setIsAllInputFilled] = useState(false);

	const signupButton = isAllInputFilled ? (
		<Button onClick={() => {}} buttonType="CTA-icon" size="m">
			회원가입
		</Button>
	) : (
		<Button onClick={() => {}} buttonType="CTA-icon" size="m" disabled>
			회원가입
		</Button>
	);

	const onClickGoBack = () => {};

	return (
		<Modal
			title="회원가입"
			rightButton={signupButton}
			onClickGoBack={onClickGoBack}
		>
			<InputBarsContainer>
				<InputBar
					id="id"
					label="아이디"
					placeholder="아이디를 입력해주세요."
					isEssential
				/>
				<InputBar
					id="password"
					label="비밀번호"
					placeholder="비밀번호를 입력해주세요."
					isEssential
				/>
				<InputBar
					id="check-password"
					label="비밀번호 확인"
					placeholder="비밀번호를 다시 입력해주세요."
					isEssential
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
