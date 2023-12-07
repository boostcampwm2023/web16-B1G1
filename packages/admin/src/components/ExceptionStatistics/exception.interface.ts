export interface Exception {
	_id: string;
	_v: number;
	error: string;
	message: string;
	path: string;
	timestamp: Date;
}

export interface ExceptionConditions {
	path?: string[];
	error?: string[];
	startDate?: Date;
	endDate?: Date;
}
