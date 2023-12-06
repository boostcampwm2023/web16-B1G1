import { Button, Modal } from 'shared/ui';
import { useState } from 'react';
import NickNameInputContainer from './ui/NickNameInputContainer';
import { postSignUp } from 'shared/apis';
import { useSignUpStore } from 'shared/store/useSignUpStore';
import { useToastStore } from 'shared/store/useToastStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useCheckLogin } from 'shared/hooks';

export default function NickNameSetModal() {
	const [validNickName, setValidNickName] = useState('');
	const navigate = useNavigate();
	const { platform } = useParams();
	const { setText } = useToastStore();
	const { id, pw } = useSignUpStore();

	useCheckLogin();

	const handleSaveButton = async () => {
		try {
			let response;
			if (!platform) {
				response = await postSignUp({
					username: id,
					password: pw,
					nickname: validNickName,
				});
			} else {
				response = await postSignUp({
					nickname: validNickName,
					platform: platform,
				});
			}

			if (response) {
				navigate('/login');
				setText('회원가입이 완료되었습니다.');
			}
		} catch (error) {
			setText('회원가입에 실패했습니다.');
		}
	};

	const handleGoBackButton = () => {
		if (!platform) return navigate('/signup');
		return navigate('/login');
	};

	const saveButton = (
		<Button
			onClick={handleSaveButton}
			buttonType="CTA-icon"
			size="m"
			type="submit"
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
			onClickGoBack={handleGoBackButton}
		>
			<NickNameInputContainer setValidNickName={setValidNickName} />
		</Modal>
	);
}
