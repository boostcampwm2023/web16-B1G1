export interface PostData {
	id: number;
	title: string;
	content: string;
	images: string[];
	like_cnt?: number;
}

export type TextStateTypes = 'DEFAULT' | 'INVALID' | 'OVER';
