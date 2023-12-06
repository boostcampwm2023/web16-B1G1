import { Slider } from 'shared/ui';
import { STAR_MAX_SIZE, STAR_MIN_SIZE, STAR_SIZE_STEP } from '../lib';

interface PropsType {
	size: number;
	setSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function SizeSlider({ size, setSize }: PropsType) {
	return (
		<Slider
			id="크기"
			min={STAR_MIN_SIZE}
			max={STAR_MAX_SIZE}
			step={STAR_SIZE_STEP}
			value={size}
			setValue={setSize}
		/>
	);
}
