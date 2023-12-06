import { ExceptionConditions } from '../exception.interface.ts';
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

	return (
		<div>
			<p>Chart</p>
			<p>Total Exception Count: {totalExceptionCount}</p>
			<p>condition: {JSON.stringify(condition)}</p>
			{exceptionData.map((exception: any) => (
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
