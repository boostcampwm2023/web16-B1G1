import { useCustomStore } from 'shared/store';
import { Button } from 'shared/ui';
import {
	ARMS_Z_DIST,
	GALAXY_THICKNESS,
	SPIRAL,
	SPIRAL_START,
} from 'widgets/galaxy/lib/constants';

export default function LeftButton() {
	const { setSpiral, setStart, setZDist, setThickness } = useCustomStore();
	const handleClick = () => {
		setSpiral(SPIRAL);
		setStart(SPIRAL_START);
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
