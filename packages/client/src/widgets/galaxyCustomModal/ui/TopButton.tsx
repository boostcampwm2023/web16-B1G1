import { RotateCcw } from 'lucide-react';
import { useCustomStore, useGalaxyStore } from 'shared/store';
import { IconButton } from 'shared/ui';

export default function TopButton() {
	const { setSpiral, setStart, setZDist, setThickness } = useCustomStore();
	const { spiral, start, zDist, thickness } = useGalaxyStore();
	const handleClick = () => {
		setSpiral(spiral);
		setStart(start);
		setZDist(zDist);
		setThickness(thickness);
	};

	return (
		<IconButton type="button" onClick={handleClick}>
			<RotateCcw color="#f2f2fd" strokeWidth={2.75} />
		</IconButton>
	);
}
