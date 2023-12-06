import { useState } from 'react';
import Button from '../shared/Button';
import Table from '../shared/Table';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function SystemInfo() {
	const [systemInfo, setSystemInfo]: any = useState([]);

	const getSystemInfo = async () => {
		const response = await fetch(baseUrl + '/admin/system-info');
		const data = await response.json();
		setSystemInfo(data);
	};

	return (
		<div>
			<Button onClick={getSystemInfo}>시스템 정보 불러오기</Button>
			<Table>
				<thead>
					<tr>
						<th>플랫폼</th>
						<th>CPU 수</th>
						<th>CPU 사용량</th>
						<th>메모리 사용량</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{systemInfo.platform}</td>
						<td>{systemInfo.cpuCount}</td>
						<td>{systemInfo.cpuUsage}</td>
						<td>{systemInfo.memUsage}</td>
					</tr>
				</tbody>
			</Table>
			<Table>
				<thead>
					<tr>
						{systemInfo.diskUsageHead &&
							(systemInfo.diskUsageHead as any).map(
								(head: string, index: number) => <th key={index}>{head}</th>,
							)}
					</tr>
				</thead>
				<tbody>
					{systemInfo.diskUsage &&
						(systemInfo.diskUsage as any).map(
							(line: string[], index: number) => {
								return (
									<tr key={index}>
										{line.map((item: string, index: number) => (
											<td key={index}>{item}</td>
										))}
									</tr>
								);
							},
						)}
				</tbody>
			</Table>
		</div>
	);
}
