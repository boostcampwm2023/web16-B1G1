import React from 'react';

interface PropsType {
	setCondition: React.Dispatch<React.SetStateAction<{}>>;
}

export default function Filter({ setCondition }: PropsType) {
	setTimeout(() => {
		setCondition({});
	}, 2000);
	return <div>Filter</div>;
}
