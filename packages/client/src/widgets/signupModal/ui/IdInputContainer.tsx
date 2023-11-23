import styled from '@emotion/styled';
import { Button, Input } from 'shared/ui';
import { useState } from 'react';
import { engNumRegex } from '../lib/regexConstants';
import { Caption } from 'shared/ui/styles';

interface PropsTypes {
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
}

type DuplicateStateTypes = 'DEFAULT' | 'VALID' | 'INVALID';

export default function IdInputContainer({ state, setState }: PropsTypes) {
	const [duplicateState, setDuplicateState] =
		useState<DuplicateStateTypes>('DEFAULT');

	const handleIdInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		if (!engNumRegex.test(target.value)) return;
		if (target.value.length > 10) return;

		setDuplicateState('DEFAULT');

		setState(target.value);
	};

	const handleIdDuplicateCheck = () => {
		// 서버에 요청

		// 사용 가능한 아이디일 경우
		setDuplicateState('VALID');

		// 사용 불가한 아이디일 경우
		setDuplicateState('INVALID');
	};

	const getMessage = () => {
		if (duplicateState === 'VALID') return '사용 가능한 아이디입니다.';
		if (duplicateState === 'INVALID') return '이미 사용중인 아이디입니다.';
		return '영숫자 조합 10자 이하로 입력해주세요.';
	};

	return (
		<Layout>
			<InputContainer>
				<IdInput
					id="id"
					label="아이디"
					placeholder="아이디를 입력해주세요."
					isEssential
					value={state}
					onChange={handleIdInput}
					autoComplete="off"
					state={duplicateState}
				/>
				<DuplicateCheckButton
					onClick={handleIdDuplicateCheck}
					size="m"
					buttonType="Button"
				>
					중복확인
				</DuplicateCheckButton>
			</InputContainer>

			<Message state={duplicateState}>{getMessage()}</Message>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: column;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: flex-end;
	width: 100%;
	gap: 8px;
`;

const IdInput = styled(Input)<{ state: DuplicateStateTypes }>`
	border-color: ${({ state, theme: { colors } }) => {
		if (state === 'INVALID') return colors.text.warning;
	}};
`;

const DuplicateCheckButton = styled(Button)`
	white-space: nowrap;
	padding: 10px 12px;
`;

const Message = styled.p<{ state: DuplicateStateTypes }>`
	margin: 4px 0 0 0;

	color: ${({ state, theme: { colors } }) => {
		switch (state) {
			case 'DEFAULT':
				return colors.text.secondary;
			case 'VALID':
				return colors.text.confirm;
			case 'INVALID':
				return colors.text.warning;
		}
	}};

	${Caption}
`;
