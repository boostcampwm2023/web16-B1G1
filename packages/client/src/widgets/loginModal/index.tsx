import { Modal } from 'shared/ui';
import { TopButton, LeftButton, RightButton, LoginContent } from './ui';
import styled from '@emotion/styled';

export default function LoginModal() {
	return (
		<Login>
			<Modal
				title="로그인"
				topButton={<TopButton />}
				rightButton={<RightButton />}
				leftButton={<LeftButton />}
			>
				<LoginContent />
			</Modal>
		</Login>
	);
}

const Login = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	width: 516px;
	top: 50%;
	left: 50%;
	z-index: 1;
	transform: translate(-50%, -50%);
	gap: 32px;
`;
