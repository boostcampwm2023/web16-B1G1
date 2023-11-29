import { useViewStore } from 'shared/store/useViewStore';
import { Button, Modal, ModalPortal } from 'shared/ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from '@emotion/styled';
import { useState } from 'react';
import AlertDialog from 'shared/ui/alertDialog/AlertDialog';
import { BASE_URL } from '@constants';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFetch } from 'shared/hooks';
import { PostData } from 'shared/lib/types/post';
import { deletePost } from './api/deletePost';

export default function PostModal() {
	const { setView } = useViewStore();
	const [deleteModal, setDeleteModal] = useState(false);
	const { postId } = useParams();
	const navigate = useNavigate();
	const { data } = useFetch<PostData>(`post/${postId}`);

	const rightButton = (
		<Button
			size="m"
			buttonType="warning-border"
			type="button"
			onClick={() => {
				setDeleteModal(true);
			}}
		>
			삭제
		</Button>
	);

	const handleDelete = async () => {
		const res = await deletePost(postId!);
		if (res.status === 200) {
			setDeleteModal(false);
			setView('MAIN');
			navigate('/home');
		}
	};

	return (
		data && (
			<ModalPortal>
				<PostModalLayout
					title={data.title}
					rightButton={rightButton}
					onClickGoBack={() => {
						setView('MAIN');
						navigate(`/home/${postId}`);
					}}
				>
					<ImageContainer>
						<Image
							src={
								data.images[0]
								// TODO: 여러 이미지 출력할 수 있는 Carousel 구현
							}
							alt="img"
						/>
					</ImageContainer>
					<TextContainer>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{data.content}
						</ReactMarkdown>
					</TextContainer>
				</PostModalLayout>
				{deleteModal && (
					<AlertDialog
						title="글을 삭제하시겠습니까?"
						description="삭제 시 복구할 수 없습니다."
						cancelButtonText="취소"
						actionButtonText="삭제"
						onClickCancelButton={() => {
							setDeleteModal(false);
						}}
						onClickActionButton={handleDelete}
					/>
				)}
			</ModalPortal>
		)
	);
}

const PostModalLayout = styled(Modal)`
	transform: translate(-10%, -50%);
`;

const TextContainer = styled.div`
	overflow-y: auto;
	width: 40vw;

	${({ theme: { colors } }) => ({
		color: colors.text.secondary,
	})}
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 26px;
`;

const Image = styled.img`
	width: 649px;
`;
