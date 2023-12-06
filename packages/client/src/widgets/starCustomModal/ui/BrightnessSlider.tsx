import { Slider } from 'shared/ui';
import {
	STAR_BRIGHTNESS_STEP,
	STAR_MAX_BRIGHTNESS,
	STAR_MIN_BRIGHTNESS,
} from '../lib';

interface PropsType {
	brightness: number;
	setBrightness: React.Dispatch<React.SetStateAction<number>>;
}

export default function BrightnessSlider({
	brightness,
	setBrightness,
}: PropsType) {
	return (
		<Slider
			id="밝기"
			min={STAR_MIN_BRIGHTNESS}
			max={STAR_MAX_BRIGHTNESS}
			step={STAR_BRIGHTNESS_STEP}
			value={brightness}
			setValue={setBrightness}
		/>
	);
}
