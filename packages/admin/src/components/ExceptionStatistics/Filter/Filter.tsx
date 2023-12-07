import React, { useState, useEffect } from 'react';
import { Exception } from '../exception.interface.ts';
import Button from '../../shared/Button.tsx';

interface PropsType {
	exceptionData: Exception[];
	setCondition: React.Dispatch<React.SetStateAction<{}>>;
}

export default function Filter({ exceptionData, setCondition }: PropsType) {
	const [defaultStartDate, defaultEndDate] = getDates();

	const [uniquePathList, setUniquePathList] = useState<Set<string>>(new Set());
	const [uniqueErrorList, setUniqueErrorList] = useState<Set<string>>(
		new Set(),
	);
	const [pathCondition, setPathCondition] = useState<string[]>([]);
	const [errorCondition, setErrorCondition] = useState<string[]>([]);
	const [startDateCondition, setStartDateCondition] =
		useState(defaultStartDate);
	const [endDateCondition, setEndDateCondition] = useState(defaultEndDate);

	useEffect(() => {
		const [pathSet, errorSet] = getSets(exceptionData);
		setUniquePathList(pathSet);
		setUniqueErrorList(errorSet);
	}, [exceptionData]);

	useEffect(() => {
		if (uniquePathList && uniqueErrorList) {
			setPathCondition([...uniquePathList]);
			setErrorCondition([...uniqueErrorList]);
		}
	}, [uniquePathList, uniqueErrorList]);

	const selectPath = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setPathCondition([...pathCondition, event.target.value]);
			return;
		}
		setPathCondition(
			pathCondition.filter((path: string) => path !== event.target.value),
		);
	};
	const selectError = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setErrorCondition([...errorCondition, event.target.value]);
			return;
		}
		setErrorCondition(
			errorCondition.filter((error: string) => error !== event.target.value),
		);
	};
	const selectStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStartDateCondition(event.target.value);
	};
	const selectEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEndDateCondition(event.target.value);
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
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: '1rem',
				height: '100%',
			}}
		>
			<div
				style={{
					backgroundColor: '#bd9494',
					width: '300px',
				}}
			>
				<p
					style={{
						fontSize: '1.5rem',
						borderBottom: '1px solid white',
					}}
				>
					경로 필터
				</p>
				{uniquePathList &&
					[...uniquePathList].map((path: string) => (
						<div key={path}>
							<input
								type="checkbox"
								id={path} // 식별자로 사용될 값
								defaultChecked={true}
								value={path} // 실제 값
								onChange={selectPath}
							/>
							<label htmlFor={path}>{path}</label>
						</div>
					))}
			</div>
			<div
				style={{
					backgroundColor: '#9cbd94',
					width: '300px',
				}}
			>
				<p
					style={{
						fontSize: '1.5rem',
						borderBottom: '1px solid white',
					}}
				>
					에러 필터
				</p>
				{uniqueErrorList &&
					[...uniqueErrorList].map((error: string) => (
						<div key={error}>
							<input
								type="checkbox"
								id={error} // 식별자로 사용될 값
								defaultChecked={true}
								value={error} // 실제 값
								onChange={selectError}
							/>
							<label htmlFor={error}>{error}</label>
						</div>
					))}
			</div>
			<div
				style={{
					backgroundColor: '#b794bd',
					width: '150px',
				}}
			>
				<p
					style={{
						fontSize: '1.5rem',
						borderBottom: '1px solid white',
					}}
				>
					시작 날짜
				</p>
				<input
					type="date"
					onChange={selectStartDate}
					defaultValue={defaultStartDate}
					max={endDateCondition}
					style={{ width: '128.75px' }}
				/>
			</div>
			<div
				style={{
					backgroundColor: '#94b5bd',
					width: '150px',
				}}
			>
				<p
					style={{
						fontSize: '1.5rem',
						borderBottom: '1px solid white',
					}}
				>
					종료 날짜
				</p>
				<input
					type="date"
					onChange={selectEndDate}
					defaultValue={defaultEndDate}
					min={startDateCondition}
					style={{ width: '128.75px' }}
				/>
			</div>
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
		exceptionData.map((exception: Exception) => exception.path),
	);
	const errorSet = new Set(
		exceptionData.map((exception: Exception) => exception.error),
	);
	return [pathSet, errorSet];
}
