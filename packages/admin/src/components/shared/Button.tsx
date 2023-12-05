import styled from '@emotion/styled';

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}

export default function Button({ children, ...args }: PropsType) {
	return <CustomButton {...args}>{children}</CustomButton>;
}

const CustomButton = styled.button<PropsType>`
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 4px;
	color: #212121;
	font-size: 14px;
	font-weight: 600;
	padding: 6px 12px;
	cursor: pointer;
	outline: none;
	&:hover {
		background-color: #ddd;
	}
`;
