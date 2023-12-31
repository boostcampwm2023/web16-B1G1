import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Body03ME } from 'shared/styles';
import { Input } from 'shared/ui';

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	min: number;
	max: number;
	step: number;
	value: number;
	setValue:
		| React.Dispatch<React.SetStateAction<number>>
		| ((value: number) => void);
}

export default function Slider({
	id,
	min,
	max,
	step,
	value,
	setValue,
}: PropsType) {
	const handleBlur = (input: number) => {
		const num = Math.round(input / step) * step;
		if (num > max) setValue(max);
		else if (num < min) setValue(min);
		else setValue(num);
	};

	return (
		<Container>
			<p>{id}</p>
			<div>
				<CustomSlider
					type="range"
					value={value}
					onChange={(e) => setValue(Number(e.target.value))}
					min={min}
					max={max}
					step={step}
				/>
				<Input
					id={id}
					placeholder="value"
					value={value}
					onChange={(e) => setValue(Number(e.target.value))}
					onBlur={(e) => handleBlur(Number(e.target.value))}
					type="number"
				/>
			</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;

	p {
		${Body03ME}
		color: ${({ theme: { colors } }) => colors.text.primary};
		white-space: nowrap;
	}

	div {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	input {
		width: 90px;
		text-align: right;
	}

	input[type='range'] {
		width: 150px;
	}

	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const CustomSlider = styled.input<React.InputHTMLAttributes<HTMLInputElement>>`
	${({ theme: { colors } }) => {
		return css`
			accent-color: ${colors.primary.hover};
		`;
	}}
`;
