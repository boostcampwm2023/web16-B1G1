import styled from '@emotion/styled';
import { Button, Input } from 'shared/ui';
import { useState } from 'react';
import { Caption } from 'shared/ui/styles';
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { getIsAvailableNickName } from 'shared/apis';
import { engOrNumRegex } from '../lib/constants';

interface PropsTypes {
	setValidNickName: React.Dispatch<React.SetStateAction<string>>;
}

type NickNameStateTypes = 'DEFAULT' | 'VALID' | 'INVALID' | 'DUPLICATED';

const MIN_ID_LENGTH = 2;
const MAX_ID_LENGTH = 10;

export default function NickNameInputContainer({
	setValidNickName,
}: PropsTypes) {
	const [nickName, setNickName] = useState('');
	const [nickNameState, setNickNameState] =
		useState<NickNameStateTypes>('DEFAULT');

	useEffect(() => {
		if (nickNameState === 'VALID') setValidNickName(nickName);
		else setValidNickName('');
	}, [nickName]);

	const handleNickNameInput = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		if (!engOrNumRegex.test(target.value)) return;
		if (target.value.length > MAX_ID_LENGTH) return;

		setNickNameState('DEFAULT');
		setNickName(target.value);
	};

	const handleIdDuplicateCheck = async () => {
		if (nickName.length < MIN_ID_LENGTH || nickName.length > MAX_ID_LENGTH) {
			setNickNameState('INVALID');
			return;
		}

		try {
			const response = await getIsAvailableNickName(nickName);

			if (response) {
				setNickNameState('VALID');
				setValidNickName(nickName);
				return;
			}
		} catch (error) {
			setNickNameState('DUPLICATED');
		}
	};

	const getMessage = () => {
		if (nickNameState === 'VALID') return '사용 가능한 닉네임입니다.';
		if (nickNameState === 'DUPLICATED') return '이미 사용중인 닉네임입니다.';
		return `${MIN_ID_LENGTH} - ${MAX_ID_LENGTH}자의 영어/숫자 닉네임을 입력해주세요.`;
	};

	return (
		<Layout>
			<InputContainer>
				<IdInput
					id="nickName"
					label="닉네임"
					placeholder="닉네임을 입력해주세요."
					isEssential
					value={nickName}
					onChange={handleNickNameInput}
					autoComplete="off"
					state={nickNameState}
				/>
				<DuplicateCheckButton
					onClick={handleIdDuplicateCheck}
					size="m"
					buttonType="Button"
					disabled={nickNameState === 'VALID'}
				>
					중복확인
				</DuplicateCheckButton>
			</InputContainer>

			<Message state={nickNameState}>{getMessage()}</Message>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	width: 452px;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: flex-end;
	width: 100%;
	gap: 8px;
`;

const IdInput = styled(Input)<{ state: NickNameStateTypes }>`
	${({ state, theme: { colors } }) => {
		if (state === 'VALID' || state === 'DEFAULT') return;

		return css`
			border-color: ${colors.text.warning};

			&:focus {
				border-color: ${colors.text.warning};
			}

			&:hover {
				border-color: ${colors.text.warning};
			}
		`;
	}};
`;

const DuplicateCheckButton = styled(Button)`
	white-space: nowrap;
	padding: 10px 12px;
`;

const Message = styled.p<{ state: NickNameStateTypes }>`
	margin: 4px 0 0 0;

	color: ${({ state, theme: { colors } }) => {
		switch (state) {
			case 'DEFAULT':
				return colors.text.secondary;
			case 'VALID':
				return colors.text.confirm;
			case 'INVALID':
				return colors.text.warning;
			case 'DUPLICATED':
				return colors.text.warning;
		}
	}};

	${Caption}
`;
