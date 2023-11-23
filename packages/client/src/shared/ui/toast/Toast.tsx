import styled from '@emotion/styled';
import { Body04BD } from '../styles';
import confirmIcon from '@icons/icon-confirm-22.svg';
import { useState } from 'react';
import { keyframes } from '@emotion/react';

interface PropsTypes {
	children: string;
}

export default function Toast({ children }: PropsTypes) {
	const [visible, setVisible] = useState(true);

	const handleAnimationEnd = () => setVisible(false);

	if (!visible) return null;

	return (
		<Layout onAnimationEnd={handleAnimationEnd}>
			<img src={confirmIcon} alt="체크 아이콘" />
			<Text>{children}</Text>
		</Layout>
	);
}

const fadeOutAnimation = keyframes`
	from { opacity: 1 }
  to { opacity: 0 }
`;

const Layout = styled.div`
	display: flex;
	position: absolute;
	top: 53px;
	left: 50%;
	transform: translate(-50%, 0%);
	z-index: 1000;
	padding: 16px 24px;
	border-radius: 40px;
	background-color: ${({ theme }) => theme.colors.primary.filled};

	animation: ${fadeOutAnimation} 1s ease forwards;
	animation-delay: 2s;
`;

const Text = styled.p`
	color: #fff;
	margin: 0 0 0 8px;
	white-space: nowrap;

	${Body04BD}
`;
