interface PropsType {
	setData: any;
}

export default function Filter({ setData }: PropsType) {
	setTimeout(() => {
		setData([]);
	}, 2000);
	return <div>Filter</div>;
}
