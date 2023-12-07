import React, { useState } from 'react';
import Button from '../../shared/Button.tsx';
import { ExceptionConditions } from '../exception.interface.ts';
import {
	DateInput,
	DateInputContainer,
	DateInputTitle,
	FilterContainer,
} from './Filter.styles.tsx';

interface PropsType {
	setCondition: React.Dispatch<React.SetStateAction<ExceptionConditions>>;
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
		<FilterContainer>
			<DateInputContainer color="#b794bd">
				<DateInputTitle>시작 날짜</DateInputTitle>
				<DateInput
					type="date"
					onChange={selectStartDate}
					defaultValue={defaultStartDate}
					max={endDateCondition}
				/>
			</DateInputContainer>
			<DateInputContainer color="#94b5bd">
				<DateInputTitle>종료 날짜</DateInputTitle>
				<DateInput
					type="date"
					onChange={selectEndDate}
					defaultValue={defaultEndDate}
					min={startDateCondition}
				/>
			</DateInputContainer>
			<Button onClick={changeCondition}>검색</Button>
		</FilterContainer>
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
