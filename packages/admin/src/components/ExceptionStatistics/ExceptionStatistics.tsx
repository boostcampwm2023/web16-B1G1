import { useState } from 'react';
import Filter from './Filter/Filter.tsx';
import Chart from './Chart/Chart.tsx';

export default function ExceptionStatistics() {
	const [condition, setCondition] = useState({});

	return (
		<div>
			<Filter setCondition={setCondition} />
			<Chart condition={condition} />
		</div>
	);
}
