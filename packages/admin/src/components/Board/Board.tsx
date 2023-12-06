import { useState } from 'react';
import Button from '../shared/Button';
import Table from '../shared/Table';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Board() {
	const [boardList, setBoardList] = useState([]);
	const [boardDetail, setBoardDetail] = useState([]);

	const getBoardList = async () => {
		const response = await fetch(baseUrl + '/admin/post');
		const data = await response.json();
		setBoardList(data);
	};

	const getBoardDetail = async (e: React.MouseEvent<HTMLButtonElement>) => {
		// 이벤트 위임으로 선택한 tr의 id값을 가져온다.
		const id = Number((e.target as any).closest('tr').id);
		const data = boardList.find((board: any) => board.id === id);
		setBoardDetail(data as any);
		console.log(boardDetail);
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
						<th>상세보기</th>
					</tr>
				</thead>
				<tbody>
					{boardList.map((board: any) => (
						<tr key={board.id} id={board.id}>
							<td>{board.id}</td>
							<td>{board.title}</td>
							<td>{board.user.nickname}</td>
							<td>{board.like_cnt}</td>
							<td>{board.images.length}</td>
							<td>{board.created_at}</td>
							<td>{board.updated_at}</td>
							<td>
								<Button onClick={(e) => getBoardDetail(e)}>상세 보기</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<div>
				{boardDetail &&
					(Object.keys(boardDetail) as any).map((detail: any) => {
						return (
							<div>
								<div>{detail + ' | ' + boardDetail[detail]}</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
