import { useViewStore } from 'shared/store/useViewStore';
import { Button, Modal, ModalPortal, TextArea } from 'shared/ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import AlertDialog from 'shared/ui/alertDialog/AlertDialog';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFetch } from 'shared/hooks';
import { PostData } from 'shared/lib/types/post';
import { deletePost } from '../api/deletePost';
import ImageSlider from './ImageSlider';
import Like from 'entities/like/Like';
import InputBar from 'shared/ui/inputBar/InputBar';
import instance from 'shared/apis/AxiosInterceptor';
import { useToastStore } from 'shared/store';

export default function PostModal() {
	const [deleteModal, setDeleteModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');

	const { setText } = useToastStore();
	const { setView } = useViewStore();
	const { postId } = useParams();
	const { data, refetch } = useFetch<PostData>(`post/${postId}`);

	const navigate = useNavigate();
	const location = useLocation();

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
			setText('글이 수정되었습니다.');
			refetch();
		} else {
			setText('글 수정에 실패했습니다.');
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
			수정
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
			취소
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
			저장
		</Button>
	);

	const handleDelete = async () => {
		const res = await deletePost(postId!);
		setDeleteModal(false);
		if (res.status === 200) {
			setText('글을 삭제했습니다.');
			setView('MAIN');
			navigate('/home');
		} else {
			setText('글 삭제에 실패했습니다.');
		}
	};

	const handleGoBackButton = () => {
		const splitedPath = location.pathname.split('/');
		const page = splitedPath[1];
		const nickName = splitedPath[2];
		let path = '/';
		if (page === 'home') path += page + '/';
		else path += page + '/' + nickName + '/';

		setView('MAIN');
		navigate(path);
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
					onClickGoBack={handleGoBackButton}
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
