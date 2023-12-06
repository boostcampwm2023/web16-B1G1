import { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ExceptionStatistics() {
	const [data, setData] = useState([]);

	const getExceptions = async () => {
		const response = await fetch(baseUrl + '/admin/exception');
		const exceptions = await response.json();
		setData(exceptions);
	};

	useEffect(() => {
		async function fetchData() {
			await getExceptions();
		}
		fetchData();
	}, []);

	return <div>{JSON.stringify(data)}</div>;
}
