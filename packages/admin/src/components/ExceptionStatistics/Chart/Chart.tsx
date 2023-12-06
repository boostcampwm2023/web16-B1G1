import { Exception, ExceptionConditions } from '../exception.interface.ts';
import { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface PropsType {
	condition: ExceptionConditions;
}

export default function Chart({ condition }: PropsType) {
	const [exceptionData, setExceptionData] = useState([]);

	const getAllExceptions = async () => {
		const response = await fetch(baseUrl + '/admin/exception');
		const exceptions = await response.json();
		setExceptionData(exceptions);
	};

	useEffect(() => {
		getAllExceptions();
	}, []);

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
			return exception.path === condition.path;
		})
		.filter((exception: any) => {
			if (!condition.error) return true;
			return exception.error === condition.error;
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
