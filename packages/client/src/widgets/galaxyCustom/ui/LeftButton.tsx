import { Button } from 'shared/ui';
import { useCustomStore } from 'shared/store';
import {
	SPIRAL,
	SPIRAL_START,
	ARMS_Z_DIST,
	GALAXY_THICKNESS,
} from 'widgets/galaxy/lib/constants';

export default function LeftButton() {
	const {
		spiral,
		setSpiral,
		start,
		setStart,
		zDist,
		setZDist,
		thickness,
		setThickness,
	} = useCustomStore();
	const handleClick = () => {
		if (spiral !== SPIRAL) setSpiral(SPIRAL);
		if (start !== SPIRAL_START) setStart(SPIRAL_START);
		if (zDist !== ARMS_Z_DIST) setZDist(ARMS_Z_DIST);
		if (thickness !== GALAXY_THICKNESS) setThickness(GALAXY_THICKNESS);
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
