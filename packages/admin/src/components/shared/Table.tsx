import styled from '@emotion/styled';

interface PropsType extends React.TableHTMLAttributes<HTMLTableElement> {
	children: React.ReactNode;
}

export default function Table({ children, ...args }: PropsType) {
	return <CustomTable {...args}>{children}</CustomTable>;
}

const CustomTable = styled.table<PropsType>`
	border-collapse: collapse;
	width: 100%;
	border: 1px solid #ddd;
	padding: 10px;
`;

export const TH = styled.th`
	border: 1px solid #ddd;
	padding: 10px;
	background-color: #d8d8d8;
`;

export const TD = styled.td`
	border-right: 1px solid #ddd;
	padding: 10px;
`;
