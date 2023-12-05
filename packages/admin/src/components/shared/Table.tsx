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
`;
