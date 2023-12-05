import { Button } from 'shared/ui';
import { useCustomStore } from 'shared/store';
import {
	SPIRAL,
	SPIRAL_START,
	STARS_DENSITY,
	ARMS_Z_DIST,
	GALAXY_THICKNESS,
} from 'widgets/galaxy/lib/constants';

export default function LeftButton() {
	const { setSpiral, setStart, setDensity, setZDist, setThickness } =
		useCustomStore();
	const handleClick = () => {
		setSpiral(SPIRAL);
		setStart(SPIRAL_START);
		setDensity(STARS_DENSITY);
		setZDist(ARMS_Z_DIST);
		setThickness(GALAXY_THICKNESS);
	};
	return (
		<Button
			size="m"
			buttonType="warning-border"
			type="button"
			onClick={handleClick}
		>
			초기화
		</Button>
	);
}
