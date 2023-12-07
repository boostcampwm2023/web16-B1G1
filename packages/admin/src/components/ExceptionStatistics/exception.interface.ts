export interface Exception {
	_id: string;
	_v: number;
	error: string;
	message: string;
	path: string;
	timestamp: Date;
}

export interface ExceptionConditions {
	startDate?: Date;
	endDate?: Date;
}
