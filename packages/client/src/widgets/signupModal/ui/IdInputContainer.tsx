import styled from '@emotion/styled';
import { Button, Input } from 'shared/ui';
import { useState } from 'react';
import { engOrNumRegex } from '../lib/constants';
import { Caption } from 'shared/ui/styles';
import { css } from '@emotion/react';
import { useEffect } from 'react';

interface PropsTypes {
	setValidId: React.Dispatch<React.SetStateAction<string>>;
}

type IdStateTypes = 'DEFAULT' | 'VALID' | 'INVALID' | 'DUPLICATED';

export default function IdInputContainer({ setValidId }: PropsTypes) {
	const [id, setId] = useState('');
	const [idState, setIdState] = useState<IdStateTypes>('DEFAULT');

	useEffect(() => {
		if (idState === 'VALID') setValidId(id);
		else setValidId('');
	}, [id]);

	const handleIdInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		if (!engOrNumRegex.test(target.value)) return;
		if (target.value.length > 10) return;

		setIdState('DEFAULT');

		setId(target.value);
	};

	const handleIdDuplicateCheck = () => {
		if (id.length < 4) {
			setIdState('INVALID');

			return;
		}

		// TODO: 서버에 요청

		// TODO: 사용 가능한 아이디일 경우
		setIdState('VALID');
		setValidId(id);

		// TODO: 중복된 아이디일 경우
		// setIdState('DUPLICATED');
	};

	const getMessage = () => {
		if (idState === 'VALID') return '사용 가능한 아이디입니다.';
		if (idState === 'DUPLICATED') return '이미 사용중인 아이디입니다.';
		return '4 - 10자의 영어/숫자 비밀번호를 입력해주세요.';
	};

	return (
		<Layout>
			<InputContainer>
				<IdInput
					id="id"
					label="아이디"
					placeholder="아이디를 입력해주세요."
					isEssential
					value={id}
					onChange={handleIdInput}
					autoComplete="off"
					state={idState}
				/>
				<DuplicateCheckButton
					onClick={handleIdDuplicateCheck}
					size="m"
					buttonType="Button"
					disabled={idState === 'VALID'}
				>
					중복확인
				</DuplicateCheckButton>
			</InputContainer>

			<Message state={idState}>{getMessage()}</Message>
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

const IdInput = styled(Input)<{ state: IdStateTypes }>`
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

const Message = styled.p<{ state: IdStateTypes }>`
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
