import styled from '@emotion/styled';
import { Button, Modal } from 'shared/ui';
import InputBar from 'shared/ui/inputBar/InputBar';
import { useState } from 'react';

export default function NickNameSetModal() {
	const [nickName, setNickName] = useState('');

	const handleSaveButton = () => {
		if (!nickName) return;

		console.log(nickName);
		// TODO: 백엔드 요청 보낸 후 로그인 모달로 이동
	};

	const handleNickNameInput = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => setNickName(target.value);

	const saveButton = (
		<Button
			onClick={handleSaveButton}
			buttonType="CTA-icon"
			size="m"
			disabled={!nickName}
		>
			저장
		</Button>
	);

	return (
		<Modal title="회원가입" rightButton={saveButton}>
			<InputBarWrapper>
				<InputBar
					id="nickName"
					label="닉네임"
					placeholder="닉네임을 입력해주세요."
					isEssential
					onChange={handleNickNameInput}
				/>
			</InputBarWrapper>
		</Modal>
	);
}

const InputBarWrapper = styled.div`
	width: 452px;
`;
