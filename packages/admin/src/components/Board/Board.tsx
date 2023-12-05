import { useState } from 'react';
import Button from '../shared/Button';
import Table from '../shared/Table';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Board() {
	const [boardList, setBoardList] = useState([]);

	const getBoardList = async () => {
		const response = await fetch(baseUrl + '/admin/post');
		const data = await response.json();
		setBoardList(data);
	};

	return (
		<div>
			<Button onClick={getBoardList}>게시글 불러오기</Button>
			<Table>
				<thead>
					<tr>
						<th>번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>좋아요</th>
						<th>이미지 수</th>
						<th>작성일시</th>
						<th>수정일시</th>
					</tr>
				</thead>
				<tbody>
					{boardList.map((board: any) => (
						<tr key={board.id}>
							<td>{board.id}</td>
							<td>{board.title}</td>
							<td>{board.user.nickname}</td>
							<td>{board.like_cnt}</td>
							<td>{board.images.length}</td>
							<td>{board.created_at}</td>
							<td>{board.updated_at}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
