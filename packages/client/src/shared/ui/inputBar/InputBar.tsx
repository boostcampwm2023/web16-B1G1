import styled from '@emotion/styled';
import theme from '../styles/theme';
import { Body02ME, Body03ME } from '../styles';

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	id: string;
	placeholder: string;
	isEssential?: boolean;
}

export default function InputBar({
	id,
	label,
	placeholder,
	isEssential = false,
	...args
}: PropsType) {
	return (
		<Container>
			{label && (
				<LabelContainer>
					<LabelText htmlFor={id}>{label}</LabelText>
					{isEssential && <LabelStar>*</LabelStar>}
				</LabelContainer>
			)}

			<Input id={id} placeholder={placeholder} {...args} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	flex: 1;
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

const LabelContainer = styled.div`
	margin: 0 0 8px 0;
`;

const LabelText = styled.label`
	color: ${theme.colors.text.secondary};
	${Body02ME}
`;

const LabelStar = styled.label`
	color: ${({ theme: { colors } }) => colors.text.warning};
	${Body02ME};
`;
