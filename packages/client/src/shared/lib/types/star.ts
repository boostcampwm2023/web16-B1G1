import { ShapeType } from '../constants/shape';
export interface StarType {
	position: { x: number; y: number; z: number };
	color: string;
	size: number;
	brightness: number;
	shape: ShapeType;
}
export interface StarData {
	id: number;
	title: string;
	star: StarType;
}

export type StarStateType = 'created' | 'normal' | 'deleted';
