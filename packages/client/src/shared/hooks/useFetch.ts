import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const BASE_URL = 'wow'; // TODO: Add base url

export const useFetch = <T>(api: string) => {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<AxiosError>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(BASE_URL + api);
				setData(res.data);
				setLoading(false);
			} catch (err) {
				setError(err as AxiosError);
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
			setError(err as AxiosError);
			setLoading(false);
		}
	};

	return { data, loading, error, refetch };
};
