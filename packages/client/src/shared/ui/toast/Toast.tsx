import styled from '@emotion/styled';
import { Body04BD } from '../styles';
import confirmIcon from '../../../../public/icons/icon-confirm-22.svg';

interface PropsTypes {
	children: string;
}

export default function Toast({ children }: PropsTypes) {
	return (
		<Layout>
			<img src={confirmIcon} alt="체크 아이콘" />
			<Text>{children}</Text>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	background-color: ${({ theme }) => theme.colors.primary.filled};
	padding: 16px 24px;
	border-radius: 27px;
`;

const Text = styled.p`
	color: #fff;
	margin: 0 0 0 8px;
	${Body04BD}
`;
