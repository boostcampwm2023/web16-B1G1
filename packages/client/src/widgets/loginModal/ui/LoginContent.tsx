import { Input } from 'shared/ui';
import styled from '@emotion/styled';
import { useLoginStore } from 'shared/store/userLoginStore';

export default function LoginContent() {
	const { id, setId, password, setPassword } = useLoginStore();

	return (
		<Container>
			<Input
				id="userID"
				label="아이디"
				type="string"
				placeholder="아이디를 입력해주세요."
				onChange={(e) => setId(e.target.value)}
				autoComplete="off"
				value={id}
			/>
			<Input
				id="userPassword"
				label="비밀번호"
				type="password"
				placeholder="비밀먼호를 입력해주세요."
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`;
