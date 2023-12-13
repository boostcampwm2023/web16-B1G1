import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postSignUp } from 'shared/apis';
import { useSignUpStore, useToastStore } from 'shared/store';
import { Button, Modal } from 'shared/ui';
import NickNameInputContainer from './ui/NickNameInputContainer';

export default function NickNameSetModal() {
	const [validNickName, setValidNickName] = useState('');
	const navigate = useNavigate();
	const { platform } = useParams();
	const { setToast } = useToastStore();
	const { id, pw } = useSignUpStore();
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

	const handleSaveButton = async () => {
		if (isSaveButtonDisabled) return;
		setIsSaveButtonDisabled(true);

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
				setToast({ text: '회원가입이 완료되었습니다.', type: 'success' });
			}
		} finally {
			setIsSaveButtonDisabled(false);
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
			disabled={!validNickName || isSaveButtonDisabled}
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
