import { IconButton } from 'shared/ui';
import { useCustomStore, useGalaxyStore } from 'shared/store';
import { RotateCcw } from 'lucide-react';

export default function TopButton() {
	const custom = useCustomStore();
	const { spiral, start, zDist, thickness } = useGalaxyStore();
	const handleClick = () => {
		if (custom.spiral !== spiral) custom.setSpiral(spiral);
		if (custom.start !== start) custom.setStart(start);
		if (custom.zDist !== zDist) custom.setZDist(zDist);
		if (custom.thickness !== thickness) custom.setThickness(thickness);
	};

	return (
		<IconButton type="button" onClick={handleClick}>
			<RotateCcw color="#f2f2fd" strokeWidth={2.75} />
		</IconButton>
	);
}
