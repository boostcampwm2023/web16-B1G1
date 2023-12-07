import React, { useState } from 'react';
import Button from '../../shared/Button.tsx';

interface PropsType {
	setCondition: React.Dispatch<React.SetStateAction<{}>>;
}

export default function Filter({ setCondition }: PropsType) {
	const [defaultStartDate, defaultEndDate] = getDates();

	const [startDateCondition, setStartDateCondition] =
		useState(defaultStartDate);
	const [endDateCondition, setEndDateCondition] = useState(defaultEndDate);

	const selectStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStartDateCondition(event.target.value);
	};
	const selectEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEndDateCondition(event.target.value);
	};

	const changeCondition = () => {
		setCondition({
			startDate: new Date(startDateCondition),
			endDate: new Date(
				new Date(endDateCondition).getTime() + 60 * 60 * 24 * 1000,
			),
		});
	};

	return (
		<div
			style={{
				padding: '1rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '1rem',
			}}
		>
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
