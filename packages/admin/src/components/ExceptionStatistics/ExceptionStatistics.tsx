import { useEffect, useState } from 'react';
import Filter from './Filter/Filter.tsx';
import Chart from './Chart/Chart.tsx';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ExceptionStatistics() {
	const [data, setData] = useState(['zz']);

	const getExceptions = async () => {
		const response = await fetch(baseUrl + '/admin/exception');
		const exceptions = await response.json();
		setData(exceptions);
	};

	useEffect(() => {
		async function asyncGetExceptions() {
			await getExceptions();
		}
		asyncGetExceptions();
	}, []);

	return (
		<div>
			<Filter setData={setData} />
			<Chart data={data} />
		</div>
	);
}
