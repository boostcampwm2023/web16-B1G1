import { IconButton } from 'shared/ui';
import { useCustomStore, useGalaxyStore } from 'shared/store';
import { RotateCcw } from 'lucide-react';

export default function TopButton() {
	const { setSpiral, setStart, setDensity, setZDist, setThickness } =
		useCustomStore();
	const { spiral, start, density, zDist, thickness } = useGalaxyStore();
	const handleClick = () => {
		setSpiral(spiral);
		setStart(start);
		setDensity(density);
		setZDist(zDist);
		setThickness(thickness);
	};

	return (
		<IconButton type="button" onClick={handleClick}>
			<RotateCcw color="#f2f2fd" strokeWidth={2.75} />
		</IconButton>
	);
}
