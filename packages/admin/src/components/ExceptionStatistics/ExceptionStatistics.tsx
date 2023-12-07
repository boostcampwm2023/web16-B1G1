import { useEffect, useState } from 'react';
import Filter from './Filter/Filter.tsx';
import ExceptionChart from './Chart/ExceptionChart.tsx';
import { Exception } from './exception.interface.ts';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ExceptionStatistics() {
	const [condition, setCondition] = useState({});
	const [exceptionData, setExceptionData] = useState([]);

	const getAllExceptions = async () => {
		const response = await fetch(baseUrl + '/admin/exception');
		const exceptions = await response.json();
		exceptions.map((exception: Exception) => {
			if (exception.path.includes('?')) {
				exception.path = exception.path.slice(0, exception.path.indexOf('?'));
			}
		});
		setExceptionData(exceptions);
	};

	useEffect(() => {
		getAllExceptions();
	}, []);

	return (
		<div>
			<Filter setCondition={setCondition} />
			<ExceptionChart exceptionData={exceptionData} condition={condition} />
		</div>
	);
}
