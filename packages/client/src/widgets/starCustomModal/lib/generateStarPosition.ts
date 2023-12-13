import { getRandomFloat } from '@utils/random';
import { StarData } from 'shared/lib';
import { ARMS_X_DIST, GALAXY_THICKNESS } from 'widgets/galaxy/lib/constants';

interface StarPosition {
	x: number;
	y: number;
	z: number;
}

export const generateStarPosition = async (
	existingStars: StarData[],
	size: number,
): Promise<StarPosition> => {
	const r = getRandomFloat(0, ARMS_X_DIST * 2);
	const theta = getRandomFloat(0, Math.PI * 2);

	const x = r * Math.cos(theta);
	const y = getRandomFloat(-GALAXY_THICKNESS, GALAXY_THICKNESS);
	const z = r * Math.sin(theta);

	const isOverlap = existingStars.some(({ star }) => {
		const dist = Math.sqrt(
			(star.position.x - x) ** 2 +
				(star.position.y - y) ** 2 +
				(star.position.z - z) ** 2,
		);
		return dist < star.size * 3 + size * 3;
	});

	if (isOverlap) {
		return generateStarPosition(existingStars, size);
	}
	return { x, y, z };
};
