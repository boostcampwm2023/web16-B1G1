import React, { useState } from 'react';
import { Exception } from '../exception.interface.ts';
import Button from '../../shared/Button.tsx';

interface PropsType {
	exceptionData: Exception[];
	setCondition: React.Dispatch<React.SetStateAction<{}>>;
}

export default function Filter({ exceptionData, setCondition }: PropsType) {
	const [defaultStartDate, defaultEndDate] = getDates();
	const [pathSet, errorSet] = getSets(exceptionData);

	const [pathCondition, setPathCondition] = useState([...pathSet]);
	const [errorCondition, setErrorCondition] = useState([...errorSet]);
	const [startDateCondition, setStartDateCondition] =
		useState(defaultStartDate);
	const [endDateCondition, setEndDateCondition] = useState(defaultEndDate);

	const selectPath = (e: any) => {
		if (e.target.checked === true) {
			setPathCondition([...pathCondition, e.target.value]);
			return;
		}
		setPathCondition(
			pathCondition.filter((path: any) => path !== e.target.value),
		);
	};
	const selectError = (e: any) => {
		if (e.target.checked === true) {
			setErrorCondition([...errorCondition, e.target.value]);
			return;
		}
		setErrorCondition(
			errorCondition.filter((error: any) => error !== e.target.value),
		);
	};
	const selectStartDate = (e: any) => {
		setStartDateCondition(e.target.value);
	};
	const selectEndDate = (e: any) => {
		setEndDateCondition(e.target.value);
	};

	const changeCondition = () => {
		setCondition({
			path: pathCondition,
			error: errorCondition,
			startDate: new Date(startDateCondition),
			endDate: new Date(
				new Date(endDateCondition).getTime() + 60 * 60 * 24 * 1000,
			),
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
				max={endDateCondition}
			/>
			<input
				type="date"
				onChange={selectEndDate}
				defaultValue={defaultEndDate}
				min={startDateCondition}
			/>
			<Button onClick={changeCondition}>검색</Button>
		</div>
	);
}

function getDates() {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const day = String(currentDate.getDate()).padStart(2, '0');
	const defaultStartDate = `${year}-${month}-01`;
	const defaultEndDate = `${year}-${month}-${day}`;
	return [defaultStartDate, defaultEndDate];
}

function getSets(exceptionData: Exception[]) {
	const pathSet = new Set(
		exceptionData.map((exception: any) => exception.path),
	);
	const errorSet = new Set(
		exceptionData.map((exception: any) => exception.error),
	);
	return [pathSet, errorSet];
}
