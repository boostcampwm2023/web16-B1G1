import styled from '@emotion/styled';
import { Input } from 'shared/ui';
import { useState } from 'react';
import { Caption } from 'shared/ui/styles';
import { css } from '@emotion/react';
import { useEffect } from 'react';

interface PropsTypes {
	validPw: string;
	setValidCheckPw: React.Dispatch<React.SetStateAction<string>>;
}

type CheckStateTypes = 'DEFAULT' | 'VALID' | 'INVALID';

const MAX_PW_LENGTH = 18;

export default function CheckPwInputContainer({
	validPw,
	setValidCheckPw,
}: PropsTypes) {
	const [checkPw, setCheckPw] = useState('');
	const [checkPwState, setCheckPwState] = useState<CheckStateTypes>('DEFAULT');

	const [isFocusOut, setIsFocusOut] = useState(false);

	useEffect(() => {
		if (checkPwState === 'VALID') setValidCheckPw(checkPw);
		else setValidCheckPw('');
	}, [checkPw, checkPwState]);

	useEffect(() => {
		if (validPw === checkPw && validPw !== '') setCheckPwState('VALID');
		else setCheckPwState('INVALID');
	}, [validPw, checkPw]);

	const handleCheckPwInput = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		if (target.value.length > MAX_PW_LENGTH) return;

		if (validPw === target.value) setCheckPwState('VALID');
		else setCheckPwState('INVALID');

		setCheckPw(target.value);
	};

	const handlePwFocusOut = () => setIsFocusOut(true);

	const getMessage = () => {
		if (checkPwState === 'DEFAULT') return '비밀번호를 한번 더 입력해주세요.';
		if (checkPwState === 'VALID') return '비밀번호가 일치합니다.';
		return '비밀번호가 일치하지 않습니다.';
	};

	return (
		<Layout>
			<PwInput
				id="password"
				label="비밀번호 확인"
				placeholder="비밀번호를 입력해주세요."
				isEssential
				value={checkPw}
				onChange={handleCheckPwInput}
				autoComplete="off"
				state={checkPwState}
				onBlur={handlePwFocusOut}
				isFocusOut={isFocusOut}
				type="password"
			/>

			<Message state={checkPwState} isFocusOut={isFocusOut}>
				{getMessage()}
			</Message>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: column;
`;

const PwInput = styled(Input)<{
	state: CheckStateTypes;
	isFocusOut: boolean;
}>`
	${({ state, isFocusOut, theme: { colors } }) => {
		if (state !== 'INVALID') return;
		if (!isFocusOut) return;

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

const Message = styled.p<{ state: CheckStateTypes; isFocusOut: boolean }>`
	margin: 4px 0 0 0;

	color: ${({ state, isFocusOut, theme: { colors } }) => {
		if (state === 'DEFAULT') return colors.text.secondary;
		if (state === 'VALID') return colors.text.confirm;
		if (!isFocusOut) return colors.text.secondary;
		return colors.text.warning;
	}};

	${Caption}
`;
