import React from 'react';

interface PropsType {
	setCondition: React.Dispatch<React.SetStateAction<{}>>;
}

export default function Filter({ setCondition }: PropsType) {
	setTimeout(() => {
		setCondition({
			startDate: new Date('2023-12-05'),
			endDate: new Date('2023-12-06'),
		});
	}, 2000);
	return <div>Filter</div>;
}
