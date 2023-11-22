import styled from '@emotion/styled';
import theme from '../styles/theme';
import { Body02ME, Body03ME } from '../styles';

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	placeholder: string;
}

export default function InputBar({
	id,
	label,
	placeholder,
	...args
}: PropsType) {
	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} placeholder={placeholder} {...args} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	width: 100%;
	height: 100%;
	padding: 12px;
	border-radius: 4px;
	background-color: ${theme.colors.background.bdp03};
	border: 1px solid ${theme.colors.stroke.default};
	color: ${theme.colors.text.third};
	${Body03ME}

	&:hover {
		border: 1px solid ${theme.colors.stroke.sc};
	}

	&:focus {
		outline: none;
		border: 1px solid ${theme.colors.stroke.focus};
		color: ${theme.colors.text.secondary};
	}
`;

const Label = styled.label`
	margin-bottom: 8px;
	color: ${theme.colors.text.secondary};
	${Body02ME}
	color: ${theme.colors.text.secondary};
`;
