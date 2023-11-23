import styled from '@emotion/styled';
import { Button, Modal } from 'shared/ui';
import InputBar from 'shared/ui/inputBar/InputBar';
import { useState } from 'react';

interface PropsType {
	changePage: React.Dispatch<{ type: 'NEXT' | 'PREV' }>;
}

export default function SignUpModal({ changePage }: PropsType) {
	const [isAllInputFilled, setIsAllInputFilled] = useState(false);

	const [inputValues, setInputValues] = useState({
		id: '',
		password: '',
		checkPassword: '',
	});

	const handleGoBackButton = () => {
		// TODO: 로그인 모달로 이동하도록 하기
	};

	const handlesignUpButton = () => {
		if (!isAllInputFilled) return;

		console.log(inputValues);
		// TODO: 회원가입 요청 보낸 후 로그인 모달로 이동
	};

	const handleInputs = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = target;

		setInputValues((prev) => {
			const updatedValues = { ...prev, [id]: value };

			if (
				updatedValues.id &&
				updatedValues.password &&
				updatedValues.checkPassword
			) {
				setIsAllInputFilled(true);
				return updatedValues;
			}

			setIsAllInputFilled(false);
			return updatedValues;
		});
	};

	const signUpButton = (
		<Button
			onClick={handlesignUpButton}
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
				<InputBar
					id="id"
					label="아이디"
					placeholder="아이디를 입력해주세요."
					isEssential
					onChange={handleInputs}
				/>
				<InputBar
					id="password"
					label="비밀번호"
					placeholder="비밀번호를 입력해주세요."
					isEssential
					onChange={handleInputs}
				/>
				<InputBar
					id="checkPassword"
					label="비밀번호 확인"
					placeholder="비밀번호를 다시 입력해주세요."
					isEssential
					onChange={handleInputs}
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
