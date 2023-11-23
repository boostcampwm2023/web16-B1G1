import styled from '@emotion/styled';
import { Input } from 'shared/ui';
import { useState } from 'react';
import { Caption } from 'shared/ui/styles';
import { css } from '@emotion/react';

interface PropsTypes {
	pwState: string;
	checkPwstate: string;
	setCheckPwState: React.Dispatch<React.SetStateAction<string>>;
}

type CheckStateTypes = 'DEFAULT' | 'VALID' | 'INVALID';

export default function CheckPwInputContainer({
	pwState,
	checkPwstate,
	setCheckPwState,
}: PropsTypes) {
	const [checkState, setCheckState] = useState<CheckStateTypes>('DEFAULT');
	const [isFocusOut, setIsFocusOut] = useState(false);

	const handleCheckPwInput = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		if (target.value.length > 18) return;

		if (pwState === target.value) setCheckState('VALID');
		else setCheckState('INVALID');

		setCheckPwState(target.value);
	};

	const handlePwFocusOut = () => setIsFocusOut(true);

	const getMessage = () => {
		if (checkState === 'DEFAULT') return '비밀번호를 한번 더 입력해주세요.';
		if (checkState === 'VALID') return '비밀번호가 일치합니다.';
		return '비밀번호가 일치하지 않습니다.';
	};

	return (
		<Layout>
			<PwInput
				id="password"
				label="비밀번호"
				placeholder="비밀번호를 입력해주세요."
				isEssential
				value={checkPwstate}
				onChange={handleCheckPwInput}
				autoComplete="off"
				checkState={checkState}
				onBlur={handlePwFocusOut}
				isFocusOut={isFocusOut}
			/>

			<Message checkState={checkState} isFocusOut={isFocusOut}>
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
	checkState: CheckStateTypes;
	isFocusOut: boolean;
}>`
	${({ checkState, isFocusOut, theme: { colors } }) => {
		if (checkState !== 'INVALID') return;
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

const Message = styled.p<{ checkState: CheckStateTypes; isFocusOut: boolean }>`
	margin: 4px 0 0 0;

	color: ${({ checkState, isFocusOut, theme: { colors } }) => {
		if (checkState === 'DEFAULT') return colors.text.secondary;
		if (checkState === 'VALID') return colors.text.confirm;
		if (!isFocusOut) return colors.text.secondary;
		return colors.text.warning;
	}};

	${Caption}
`;
