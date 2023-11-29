import { useViewStore } from 'shared/store/useViewStore';
import { Button, Modal, ModalPortal } from 'shared/ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from '@emotion/styled';
import { useState } from 'react';
import AlertDialog from 'shared/ui/alertDialog/AlertDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from 'shared/hooks';
import { PostData } from 'shared/lib/types/post';
import { deletePost } from './api/deletePost';
import ImageSlider from './ui/ImageSlider';

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
					{data.images.length > 0 && (
						<ImageContainer>
							<ImageSlider imageUrls={data.images} />
						</ImageContainer>
					)}
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
	width: 100%;
	height: 100%;
`;
