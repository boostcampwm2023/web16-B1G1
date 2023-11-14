export const getGaussianRandomFloat = (
	mean: number = 0,
	deviation: number = 1,
) => {
	const u = 1 - Math.random();
	const v = Math.random();
	const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

	return mean + deviation * z;
};

export const getRandomInt = (min: number, max: number) => {
	const minCeil = Math.ceil(min);
	const maxFloor = Math.floor(max);

	return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
};

export const getRandomFloat = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};
