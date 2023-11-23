import { Button } from 'shared/ui';
import styled from '@emotion/styled';
import React from 'react';
import { Title02 } from 'shared/ui/styles';

interface PropsType {
	changePage: React.Dispatch<{ type: 'NEXT' | 'PREV' }>;
}

export default function LogoAndStart({ changePage }: PropsType) {
	return (
		<Container>
			<Logo>Logo</Logo>
			<Button
				onClick={() => changePage({ type: 'NEXT' })}
				size="l"
				buttonType="CTA-icon"
				style={{ width: '516px', padding: '24px 12px' }}
			>
				<Start>시작하기</Start>
			</Button>
		</Container>
	);
}

const Logo = styled.div`
	display: flex;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 16px;
	color: white;
	width: 700px;
	height: 180px;
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	gap: 120px;
	align-items: center;
	z-index: 1;
`;

const Start = styled.div`
	${Title02}
`;
