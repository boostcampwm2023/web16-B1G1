import { useState } from 'react';
import Button from '../shared/Button';
import Table, { TD, TH } from '../shared/Table';

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
		const id = Number((e.target as HTMLButtonElement).closest('tr')!.id);
		const data = boardList.find((board: any) => board.id === id);
		setBoardDetail(data as any);
	};

	return (
		<div>
			<Button onClick={getBoardList}>게시글 불러오기</Button>
			<Table>
				<thead>
					<tr>
						<TH>번호</TH>
						<TH>제목</TH>
						<TH>작성자</TH>
						<TH>좋아요</TH>
						<TH>이미지 수</TH>
						<TH>작성일시</TH>
						<TH>수정일시</TH>
						<TH>상세보기</TH>
					</tr>
				</thead>
				<tbody>
					{boardList.map((board: any) => (
						<tr key={board.id} id={board.id}>
							<TD>{board.id}</TD>
							<TD>{board.title}</TD>
							<TD>{board.user.nickname}</TD>
							<TD>{board.like_cnt}</TD>
							<TD>{board.images.length}</TD>
							<TD>{board.created_at}</TD>
							<TD>{board.updated_at}</TD>
							<TD>
								<Button onClick={getBoardDetail}>상세 보기</Button>
							</TD>
						</tr>
					))}
				</tbody>
			</Table>
			<div>
				{boardDetail &&
					Object.keys(boardDetail)?.map((detail: any) => {
						return (
						  <div>{detail + ' | ' + boardDetail[detail]}</div>
						);
					})}
			</div>
		</div>
	);
}
