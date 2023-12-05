import styled from '@emotion/styled';

interface PropsType extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export default function Nav({ children, ...args }: PropsType) {
	return <CustomNav {...args}>{children}</CustomNav>;
}

// 최상단에 위치하도록 설정
const CustomNav = styled.nav<PropsType>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 20px;

	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #fff;
	border-bottom: 1px solid #ddd;
	padding: 12px 12px;
	& > a {
		margin-right: 16px;
		text-decoration: none;
		color: #212121;
		font-size: 14px;
		font-weight: 600;
	}
	& > a:hover {
		text-decoration: underline;
	}
`;
