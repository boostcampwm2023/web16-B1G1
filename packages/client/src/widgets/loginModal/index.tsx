import { Modal, IconButton } from 'shared/ui';
import { TopButton, LeftButton, RightButton, LoginContent } from './ui';
import styled from '@emotion/styled';
import BackIcon from '@icons/icon-back-32-white.svg?react';

interface PropsType {
	changePage: React.Dispatch<{ type: 'NEXT' | 'PREV' }>;
}

export default function LoginModal({ changePage }: PropsType) {
	return (
		<Login>
			<Modal
				title="로그인"
				topButton={<TopButton onClick={() => changePage({ type: 'PREV' })} />}
				rightButton={<RightButton />}
				leftButton={<LeftButton onClick={() => console.log('회원가입')} />}
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

const PrevButton = styled.div`
	position: absolute;
	top: -12px;
	transform: translate(0, -100%);
`;
