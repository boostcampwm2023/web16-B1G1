import { useViewStore } from 'shared/store/useViewStore';
import { Button, Modal, ModalPortal, TextArea } from 'shared/ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import AlertDialog from 'shared/ui/alertDialog/AlertDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from 'shared/hooks';
import { PostData } from 'shared/lib/types/post';
import { deletePost } from '../api/deletePost';
import ImageSlider from './ImageSlider';
import Like from 'entities/like/Like';
import InputBar from 'shared/ui/inputBar/InputBar';
import instance from 'shared/apis/AxiosInterceptor';

export default function PostModal() {
	const { setView } = useViewStore();
	const [deleteModal, setDeleteModal] = useState(false);
	const { postId } = useParams();
	const navigate = useNavigate();
	const { data, refetch } = useFetch<PostData>(`post/${postId}`);
	const [isEdit, setIsEdit] = useState(false);
	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');

	useEffect(() => {
		setContent(data?.content ?? '');
		setTitle(data?.title ?? '');
	}, [data]);

	const handleEditSave = async () => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		const res = await instance({
			url: `/post/${postId}`,
			method: 'PATCH',
			data: formData,
		});
		if (res.status === 200) {
			setIsEdit(false);
			refetch();
		} else {
			alert('글 수정 실패');
		}
	};

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

	const EditButton = (
		<Button
			size="m"
			buttonType="CTA-icon"
			type="button"
			onClick={() => {
				setIsEdit(true);
			}}
		>
			수정하기
		</Button>
	);

	const EditCancelButton = (
		<Button
			size="m"
			buttonType="Button"
			type="button"
			onClick={() => {
				setIsEdit(false);
			}}
		>
			취소하기
		</Button>
	);

	const EditSaveButton = (
		<Button
			size="m"
			buttonType="CTA-icon"
			type="button"
			onClick={() => {
				setIsEdit(false);
				handleEditSave();
			}}
		>
			저장하기
		</Button>
	);

	const handleDelete = async () => {
		const res = await deletePost(postId!);
		setDeleteModal(false);
		if (res.status === 200) {
			setView('MAIN');
			navigate('/home');
			window.location.reload();
		} else {
			alert('글 삭제 실패');
		}
	};

	return (
		data && (
			<ModalPortal>
				<PostModalLayout
					title={isEdit ? '글 수정하기' : data.title}
					rightButton={isEdit ? EditSaveButton : rightButton}
					topButton={isEdit ? EditCancelButton : EditButton}
					leftButton={
						isEdit ? null : <Like postId={postId!} count={data.like_cnt ?? 0} />
					}
					onClickGoBack={() => {
						setView('MAIN');
						navigate(`/home/${postId}`);
					}}
				>
					<Container>
						{data.images.length > 0 && !isEdit && (
							<ImageContainer>
								<ImageSlider imageUrls={data.images} />
							</ImageContainer>
						)}
						{isEdit ? (
							<TextContainer>
								<InputBar
									id={'postTitle'}
									placeholder="제목"
									style={{ marginBottom: '30px', height: '25%' }}
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<TextArea
									value={content}
									onChange={(content) => {
										setContent(content);
									}}
									width="100%"
									height="75%"
								/>
							</TextContainer>
						) : (
							<TextContainer>
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{data.content}
								</ReactMarkdown>
							</TextContainer>
						)}
					</Container>
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

const Container = styled.div`
	height: 50vh;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background-color: ${({ theme }) => theme.colors.text.primary};
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.colors.text.third};
		border-radius: 4px;
	}
`;

const TextContainer = styled.div`
	width: 40vw;
	height: 100%;
	${({ theme: { colors } }) => ({
		color: colors.text.secondary,
	})}
`;

const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 26px;
`;
