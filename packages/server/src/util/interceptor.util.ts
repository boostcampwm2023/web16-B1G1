import { v4 as uuid } from 'uuid';

export function getRandomId(): string {
	return uuid().slice(0, 6);
}
