import { Input } from 'shared/ui';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Caption } from 'shared/ui/styles';
import OauthLogin from './OauthLogin';

interface PropsType {
	useId: [string, React.Dispatch<React.SetStateAction<string>>];
	useIdState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	usePassword: [string, React.Dispatch<React.SetStateAction<string>>];
	usePasswordState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function LoginContent({
	useId: [id, setId],
	useIdState: [idState, setIdState],
	usePassword: [password, setPassword],
	usePasswordState: [passwordState, setPasswordState],
}: PropsType) {
	return (
		<Container>
			<LoginInput state={idState}>
				<Input
					id="userID"
					label="아이디"
					type="string"
					placeholder="아이디를 입력해주세요."
					onChange={(e) => {
						if (idState === false) setIdState(true);
						setId(e.target.value);
					}}
					autoComplete="off"
					value={id}
				/>
				<p>등록되지 않은 계정입니다</p>
			</LoginInput>
			<LoginInput state={passwordState}>
				<Input
					id="userPassword"
					label="비밀번호"
					type="password"
					placeholder="비밀번호를 입력해주세요."
					onChange={(e) => {
						if (passwordState === false) setPasswordState(true);
						setPassword(e.target.value);
					}}
					value={password}
				/>
				<p>비밀번호가 일치하지 않습니다</p>
			</LoginInput>
			<OauthLogin />
		</Container>
	);
}

interface LoginInputProps {
	state: boolean;
}

const LoginInput = styled.div<LoginInputProps>`
	p {
		position: absolute;
		display: none;
		margin-top: 4px;
		${Caption}
	}

	${({ state, theme: { colors } }) => {
		if (state === false) {
			return css`
				Input {
					border-color: ${colors.warning.filled};
				}
				p {
					display: flex;
					color: ${colors.warning.filled};
				}
			`;
		}
	}};
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`;
