export default function Chart(props: any) {
	return (
		<div>
			<p>Chart</p>
			{props.data.map((exception: any) => (
				<div key={exception.id}>
					<p>-------------</p>
					<p>{exception.path}</p>
					<p>{exception.error}</p>
					<p>{exception.message}</p>
					<p>{exception.timestamp}</p>
				</div>
			))}
		</div>
	);
}
