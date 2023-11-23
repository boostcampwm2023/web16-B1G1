import styled from '@emotion/styled';
import { Input } from 'shared/ui';
import { engAndNumRegex, engOrNumRegex } from '../lib/constants';
import { useState } from 'react';
import { Caption } from 'shared/ui/styles';
import { css } from '@emotion/react';
import { useEffect } from 'react';

interface PropsTypes {
	setValidPw: React.Dispatch<React.SetStateAction<string>>;
}

type PwStateTypes = 'DEFAULT' | 'VALID' | 'INVALID';

export default function PwInputContainer({ setValidPw }: PropsTypes) {
	const [pw, setPw] = useState('');
	const [pwState, setPwState] = useState<PwStateTypes>('DEFAULT');

	const [isFocusOut, setIsFocusOut] = useState(false);

	useEffect(() => {
		if (pwState === 'VALID') setValidPw(pw);
		else setValidPw('');
	}, [pw]);

	const handlePwInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		if (!engOrNumRegex.test(target.value)) return;
		if (target.value.length > 18) return;

		if (target.value.length < 8) setPwState('INVALID');
		else if (engAndNumRegex.test(target.value)) setPwState('VALID');
		else setPwState('INVALID');

		setPw(target.value);
	};

	const handlePwFocusOut = () => setIsFocusOut(true);

	const getMessage = () => {
		if (pwState === 'VALID') return '사용 가능한 비밀번호입니다.';
		return '8 - 18자의 영숫자 조합 비밀번호를 입력해주세요.';
	};

	return (
		<Layout>
			<PwInput
				id="password"
				label="비밀번호"
				placeholder="비밀번호를 입력해주세요."
				isEssential
				value={pw}
				onChange={handlePwInput}
				autoComplete="off"
				state={pwState}
				onBlur={handlePwFocusOut}
				isFocusOut={isFocusOut}
				type="password"
			/>

			<Message state={pwState} isFocusOut={isFocusOut}>
				{getMessage()}
			</Message>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: column;
`;

const PwInput = styled(Input)<{ state: PwStateTypes; isFocusOut: boolean }>`
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

const Message = styled.p<{ state: PwStateTypes; isFocusOut: boolean }>`
	margin: 4px 0 0 0;

	color: ${({ state, isFocusOut, theme: { colors } }) => {
		if (state === 'DEFAULT') return colors.text.secondary;
		if (state === 'VALID') return colors.text.confirm;
		if (!isFocusOut) return colors.text.secondary;
		return colors.text.warning;
	}};

	${Caption}
`;
