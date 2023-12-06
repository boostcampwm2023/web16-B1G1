import React, { useState } from 'react';
import { Exception } from '../exception.interface.ts';
import Button from '../../shared/Button.tsx';

interface PropsType {
	exceptionData: Exception[];
	setCondition: React.Dispatch<React.SetStateAction<{}>>;
}

export default function Filter({ exceptionData, setCondition }: PropsType) {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const day = String(currentDate.getDate()).padStart(2, '0');
	const defaultStartDate = `${year}-${month}-01`;
	const defaultEndDate = `${year}-${month}-${day}`;

	const [path, setPath] = useState('');
	const [error, setError] = useState('');
	const [startDate, setStartDate] = useState(defaultStartDate);
	const [endDate, setEndDate] = useState(defaultEndDate);

	const pathSet = new Set(
		exceptionData.map((exception: any) => exception.path),
	);
	const errorSet = new Set(
		exceptionData.map((exception: any) => exception.error),
	);

	const selectPath = (e: any) => {
		setPath(e.target.value);
	};
	const selectError = (e: any) => {
		setError(e.target.value);
	};
	const selectStartDate = (e: any) => {
		setStartDate(e.target.value);
	};
	const selectEndDate = (e: any) => {
		setEndDate(e.target.value);
	};

	const changeCondition = () => {
		setCondition({
			path,
			error,
			startDate: new Date(startDate),
			endDate: new Date(new Date(endDate).getTime() + 60 * 60 * 24 * 1000),
		});
	};

	return (
		<div>
			<select name="path" onChange={selectPath}>
				<option value="">모두 보기</option>
				{[...pathSet].map((path: any) => (
					<option key={path} value={path}>
						{path}
					</option>
				))}
			</select>
			<select name="error" onChange={selectError}>
				<option value="">모두 보기</option>
				{[...errorSet].map((error: any) => (
					<option key={error} value={error}>
						{error}
					</option>
				))}
			</select>
			<input
				type="date"
				onChange={selectStartDate}
				defaultValue={defaultStartDate}
				max={endDate}
			/>
			<input
				type="date"
				onChange={selectEndDate}
				defaultValue={defaultEndDate}
				min={startDate}
			/>
			<Button onClick={changeCondition}>검색</Button>
		</div>
	);
}
