import styled from '@emotion/styled';
import { Input } from 'shared/ui';
import { engAndNumRegex, engOrNumRegex } from '../lib/regexConstants';
import { useState } from 'react';
import { Caption } from 'shared/ui/styles';
import { css } from '@emotion/react';

interface PropsTypes {
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function PwInputContainer({ state, setState }: PropsTypes) {
	const [isValid, setIsValid] = useState(false);
	const [isFocusOut, setIsFocusOut] = useState(false);

	const handlePwInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		if (!engOrNumRegex.test(target.value)) return;
		if (target.value.length > 18) return;

		if (target.value.length < 8) setIsValid(false);
		else if (engAndNumRegex.test(target.value)) setIsValid(true);
		else setIsValid(false);

		setState(target.value);
	};

	const handlePwFocusOut = () => setIsFocusOut(true);

	const message = '	8 - 18자의 영숫자 조합 비밀번호를 입력해주세요.';

	return (
		<Layout>
			<PwInput
				id="password"
				label="비밀번호"
				placeholder="비밀번호를 입력해주세요."
				isEssential
				value={state}
				onChange={handlePwInput}
				autoComplete="off"
				isValid={isValid}
				onBlur={handlePwFocusOut}
				isFocusOut={isFocusOut}
			/>

			<Message isValid={isValid} isFocusOut={isFocusOut}>
				{message}
			</Message>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: column;
`;

const PwInput = styled(Input)<{ isValid: boolean; isFocusOut: boolean }>`
	${({ isValid, isFocusOut, theme: { colors } }) => {
		if (isValid || !isFocusOut) return;

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

const Message = styled.p<{ isValid: boolean; isFocusOut: boolean }>`
	margin: 4px 0 0 0;

	color: ${({ isValid, isFocusOut, theme: { colors } }) => {
		if (isValid || !isFocusOut) return colors.text.secondary;
		else return colors.text.warning;
	}};

	${Caption}
`;
