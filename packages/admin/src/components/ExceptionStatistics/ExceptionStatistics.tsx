import { useEffect, useState } from 'react';
import Filter from './Filter/Filter.tsx';
import Chart from './Chart/Chart.tsx';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ExceptionStatistics() {
	const [condition, setCondition] = useState({});
	const [exceptionData, setExceptionData] = useState([]);

	const getAllExceptions = async () => {
		const response = await fetch(baseUrl + '/admin/exception');
		const exceptions = await response.json();
		setExceptionData(exceptions);
	};

	useEffect(() => {
		getAllExceptions();
	}, []);

	return (
		<div>
			<Filter exceptionData={exceptionData} setCondition={setCondition} />
			<Chart exceptionData={exceptionData} condition={condition} />
		</div>
	);
}
