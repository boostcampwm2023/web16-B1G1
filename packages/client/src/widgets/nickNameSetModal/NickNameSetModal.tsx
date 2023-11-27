import { Button, Modal } from 'shared/ui';
import { useState } from 'react';
import NickNameInputContainer from './ui/NickNameInputContainer';
import { postSignUp } from 'shared/apis';
import { useSignUpStore } from 'shared/store/useSignUpStore';
import { useToastStore } from 'shared/store/useToastStore';
import { useNavigate } from 'react-router-dom';

export default function NickNameSetModal() {
	const [validNickName, setValidNickName] = useState('');
	const navigate = useNavigate();

	const handleSaveButton = async () => {
		// TODO: 소셜로그인 시 로직 따로 추가해야 함

		const { id, pw } = useSignUpStore.getState();

		try {
			const response = await postSignUp({
				username: id,
				password: pw,
				nickname: validNickName,
			});

			if (response) {
				navigate('/login');

				useToastStore.setState({
					text: '회원가입이 완료되었습니다.',
				});
			}
		} catch (error) {
			useToastStore.setState({
				text: '회원가입에 실패했습니다.',
			});
		}
	};

	const saveButton = (
		<Button
			onClick={handleSaveButton}
			buttonType="CTA-icon"
			size="m"
			disabled={!validNickName}
		>
			저장
		</Button>
	);

	return (
		<Modal
			title="닉네임 설정"
			rightButton={saveButton}
			description="서비스 이용에 사용할 닉네임을 정해주세요"
		>
			<NickNameInputContainer setValidNickName={setValidNickName} />
		</Modal>
	);
}
