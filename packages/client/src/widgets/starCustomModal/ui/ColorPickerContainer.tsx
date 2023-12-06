import { ColorChangeHandler, SliderPicker } from 'react-color';
import styled from '@emotion/styled';
import { Body03ME } from 'shared/ui/styles';

interface PropsType {
	color: string;
	setColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function ColorPickerContainer({ color, setColor }: PropsType) {
	const handleColorChange: ColorChangeHandler = (color) => setColor(color.hex);

	return (
		<div>
			<Label>색상</Label>
			<SliderPicker color={color} onChange={handleColorChange} />
		</div>
	);
}

const Label = styled.p`
	color: ${({ theme: { colors } }) => colors.text.primary};
	margin: 0 0 8px 0;
	${Body03ME}
`;
