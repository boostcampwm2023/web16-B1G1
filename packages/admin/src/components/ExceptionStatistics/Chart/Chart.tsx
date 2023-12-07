import { Exception, ExceptionConditions } from '../exception.interface.ts';

interface PropsType {
	exceptionData: Exception[];
	condition: ExceptionConditions;
}

export default function Chart({ exceptionData, condition }: PropsType) {
	const totalExceptionCount = exceptionData.length;
	const filteredExceptionData = filter(exceptionData, condition);
	const filteredExceptionCount = filteredExceptionData.length;

	return (
		<div>
			<p>Chart</p>
			<p>Total Exception Count: {totalExceptionCount}</p>
			<p>Filtered Exception Count: {filteredExceptionCount}</p>
			<p>condition: {JSON.stringify(condition)}</p>
			{filteredExceptionData.map((exception: any) => (
				<div key={exception._id}>
					<p>-------------</p>
					<p>{exception.path}</p>
					<p>{exception.error}</p>
					<p>{exception.message}</p>
					<p>{exception.timestamp}</p>
				</div>
			))}
		</div>
	);
}

function filter(
	exceptionData: Exception[],
	condition: ExceptionConditions,
): Exception[] {
	const filterdData = exceptionData
		.filter((exception: any) => {
			if (!condition.path) return true;
			return condition.path.includes(exception.path);
		})
		.filter((exception: any) => {
			if (!condition.error) return true;
			return condition.error.includes(exception.error);
		})
		.filter((exception: any) => {
			const { startDate, endDate } = condition;
			const timestamp = new Date(exception.timestamp);
			if (!startDate && !endDate) return true;
			if (startDate && !endDate) return timestamp >= startDate;
			if (!startDate && endDate) return timestamp <= endDate;
			if (startDate && endDate)
				return timestamp >= startDate && timestamp <= endDate;
		});
	return filterdData;
}
