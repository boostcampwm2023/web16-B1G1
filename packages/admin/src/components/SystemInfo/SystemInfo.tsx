import { useState } from 'react';
import Button from '../shared/Button';
import Table, { TD, TH } from '../shared/Table';

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
						<TH>플랫폼</TH>
						<TH>CPU 수</TH>
						<TH>CPU 사용량</TH>
						<TH>메모리 사용량</TH>
					</tr>
				</thead>
				<tbody>
					<tr>
						<TD>{systemInfo.platform}</TD>
						<TD>{systemInfo.cpuCount}</TD>
						<TD>{systemInfo.cpuUsage}</TD>
						<TD>{systemInfo.memUsage}</TD>
					</tr>
				</tbody>
			</Table>
			<Table>
				<thead>
					<tr>
						{systemInfo.diskUsageHead &&
							(systemInfo.diskUsageHead as any).map(
								(head: string, index: number) => <TH key={index}>{head}</TH>,
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
											<TD key={index}>{item}</TD>
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
