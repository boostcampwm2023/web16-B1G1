import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'wow'; // TODO: Add base url

export const useFetch = (api: string) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(BASE_URL + api);
				setData(res.data);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};
		fetchData();
	}, [api]);

	const refetch = async () => {
		setLoading(true);
		try {
			const res = await axios.get(BASE_URL + api);
			setData(res.data);
			setLoading(false);
		} catch (err) {
			setError(err);
			setLoading(false);
		}
	};

	return { data, loading, error, refetch };
};
