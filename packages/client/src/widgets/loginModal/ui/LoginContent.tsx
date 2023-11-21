import { Input } from 'shared/ui';
import styled from '@emotion/styled';

export default function LoginContent() {
	return (
		<Container>
			<Input id="userID" label="아이디" placeholder="아이디를 입력해주세요." />
			<Input
				id="userPassword"
				label="비밀번호"
				placeholder="비밀먼호를 입력해주세요."
			/>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`;
