import { Exception, ExceptionConditions } from '../exception.interface.ts';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import React, { useState } from 'react';
Chart.register(CategoryScale);

interface PropsType {
	exceptionData: Exception[];
	condition: ExceptionConditions;
}

export default function ExceptionChart({
	exceptionData,
	condition,
}: PropsType) {
	const totalExceptionCount = exceptionData.length;
	const filteredExceptionData = filter(exceptionData, condition);
	const filteredExceptionCount = filteredExceptionData.length;
	const uniqueDate = getUniqueDate(filteredExceptionData);

	const [option, setOption] = useState('path');

	const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setOption(event.target.value);
	};

	return (
		<div>
			<p>Total Exception Count: {totalExceptionCount}</p>
			<p>Filtered Exception Count: {filteredExceptionCount}</p>
			<select
				style={{
					marginBottom: '20px',
					padding: '5px',
				}}
				onChange={handleChangeOption}
			>
				<option value="path">경로 기준으로 보기</option>
				<option value="error">에러 기준으로 보기</option>
			</select>
			<Bar
				data={{
					labels: uniqueDate,
					datasets: getDatasets(filteredExceptionData, uniqueDate, option),
				}}
			/>
		</div>
	);
}

function filter(
	exceptionData: Exception[],
	condition: ExceptionConditions,
): Exception[] {
	const filterdData = exceptionData
		.filter((exception: any) => {
			if (!condition.path) return true;
			return condition.path.includes(exception.path);
		})
		.filter((exception: any) => {
			if (!condition.error) return true;
			return condition.error.includes(exception.error);
		})
		.filter((exception: any) => {
			const { startDate, endDate } = condition;
			const timestamp = new Date(exception.timestamp);
			if (!startDate && !endDate) return true;
			if (startDate && !endDate) return timestamp >= startDate;
			if (!startDate && endDate) return timestamp <= endDate;
			if (startDate && endDate)
				return timestamp >= startDate && timestamp <= endDate;
		});
	return filterdData;
}

function getUniqueDate(exceptionData: Exception[]) {
	const uniqueDate = new Set(
		exceptionData.map((exception: Exception) => {
			return exception.timestamp.toLocaleString().slice(0, 10);
		}),
	);
	return [...uniqueDate];
}

function getDatasets(
	exceptionData: Exception[],
	uniqueDate: string[],
	option: string,
) {
	if (option === 'path') {
		const uniquePathList = new Set(
			exceptionData.map((exception: Exception) => exception.path),
		);
		const datasets = [...uniquePathList].map((path: string) => {
			const filteredData = uniqueDate.map((date: string) => {
				return exceptionData.filter(
					(exception: Exception) =>
						exception.path === path &&
						exception.timestamp.toLocaleString().slice(0, 10) === date,
				);
			});
			const randomColor = getRandomColor();
			return {
				label: path,
				data: filteredData.map((data: Exception[]) => data.length),
				backgroundColor: randomColor,
				borderColor: randomColor,
				borderWidth: 1,
			};
		});
		return datasets;
	}

	const uniqueErrorList = new Set(
		exceptionData.map((exception: Exception) => exception.error),
	);
	const datasets = [...uniqueErrorList].map((error: string) => {
		const filteredData = uniqueDate.map((date: string) => {
			return exceptionData.filter(
				(exception: Exception) =>
					exception.error === error &&
					exception.timestamp.toLocaleString().slice(0, 10) === date,
			);
		});
		const randomColor = getRandomColor();
		return {
			label: error,
			data: filteredData.map((data: Exception[]) => data.length),
			backgroundColor: randomColor,
			borderColor: randomColor,
			borderWidth: 1,
		};
	});
	return datasets;
}

function getRandomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
}
