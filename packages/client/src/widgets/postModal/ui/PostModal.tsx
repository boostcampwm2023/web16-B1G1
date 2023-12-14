import styled from '@emotion/styled';
import { Like } from 'entities';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { instance } from 'shared/apis';
import { useCheckNickName, useFetch, useRefresh } from 'shared/hooks';
import { PostData, TextStateTypes } from 'shared/lib';
import { useCameraStore, useToastStore, useViewStore } from 'shared/store';
import { AlertDialog, Button, Input, Modal, TextArea } from 'shared/ui';
import { deletePost } from '../api/deletePost';
import ImageSlider from './ImageSlider';
import { Caption } from 'shared/styles';
import { css } from '@emotion/react';

export default function PostModal() {
	const [deleteModal, setDeleteModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');
	const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(false);
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
	const [titleState, setTitleState] = useState<TextStateTypes>('DEFAULT');
	const [contentState, setContentState] = useState<TextStateTypes>('DEFAULT');

	const { setToast } = useToastStore();
	const { setView } = useViewStore();
	const { setTargetView } = useCameraStore();
	const { postId } = useParams();
	const { data, refetch } = useFetch<PostData>(`post/${postId}`);

	const { page } = useCheckNickName();

	const navigate = useNavigate();
	const location = useLocation();

	useRefresh('POST');

	useEffect(() => {
		setContent(data?.content ?? '');
		setTitle(data?.title ?? '');
	}, [data]);

	const handleEditSave = async () => {
		if (isSaveButtonDisabled) return;
		setIsSaveButtonDisabled(true);
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		try {
			await instance({
				url: `/post/${postId}`,
				method: 'PATCH',
				data: formData,
			});
			setIsEdit(false);
			setToast({ text: '글이 수정되었습니다.', type: 'success' });
			refetch();
		} finally {
			setIsSaveButtonDisabled(false);
		}
	};

	const RightButton = (
		<ButtonContainer>
			<Button
				size="m"
				buttonType="CTA-icon"
				type="button"
				onClick={() => {
					setIsEdit(true);
				}}
				disabled={page !== 'home'}
			>
				수정
			</Button>
			<Button
				size="m"
				buttonType="warning-border"
				type="button"
				onClick={() => {
					setDeleteModal(true);
				}}
				disabled={page !== 'home'}
			>
				삭제
			</Button>
		</ButtonContainer>
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
				if (title === '') return setTitleState('INVALID');
				if (content === '') return setContentState('INVALID');
				setIsEdit(false);
				handleEditSave();
			}}
			disabled={isSaveButtonDisabled}
		>
			저장
		</Button>
	);

	const handleDelete = async () => {
		try {
			await deletePost(postId!);
			setDeleteModal(false);
			setToast({ text: '글이 삭제되었습니다.', type: 'success' });
			setView('MAIN');
			navigate('/home');
			setTargetView(null);
		} finally {
			setIsDeleteButtonDisabled(false);
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
		setTargetView(null);
	};

	return (
		data && (
			<>
				<PostModalLayout
					title={isEdit ? '글 수정하기' : data.title}
					rightButton={isEdit ? EditSaveButton : page === 'home' && RightButton}
					topButton={isEdit && EditCancelButton}
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
							<TextContainer style={{ height: '100%' }}>
								<TitleContainer>
									<TitleInput
										id={'postTitle'}
										state={titleState}
										placeholder="제목"
										style={{ height: '25%' }}
										value={title}
										onChange={(e) => {
											if (e.target.value.length > 20) {
												setTitleState('OVER');
												return;
											}
											setTitleState('DEFAULT');
											setTitle(e.target.value);
										}}
										autoComplete="off"
									/>
									{titleState === 'INVALID' && (
										<Message>제목을 입력해주세요.</Message>
									)}
									{titleState === 'OVER' && (
										<Message>제목은 20자 까지 입력 가능합니다.</Message>
									)}
								</TitleContainer>
								<ContentContainer state={contentState}>
									<TextArea
										value={content}
										onChange={(content) => {
											setContentState('DEFAULT');
											setContent(content);
										}}
										width="100%"
										height="100%"
									/>
									{contentState === 'INVALID' && (
										<Message>내용을 입력해주세요.</Message>
									)}
								</ContentContainer>
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
						disabled={isDeleteButtonDisabled}
					/>
				)}
			</>
		)
	);
}

const ContentContainer = styled.div<{ state: TextStateTypes }>`
	border: 1px solid;
	border-radius: 4px;
	height: 75%;
	${({ state, theme: { colors } }) => {
		if (state === 'DEFAULT') return;

		return css`
			border-color: ${colors.text.warning};

			&:focus {
				border-color: ${colors.text.warning};
			}

			&:hover {
				border-color: ${colors.text.warning};
			}
		`;
	}};
`;

const TitleInput = styled(Input)<{ state: TextStateTypes }>`
	${({ state, theme: { colors } }) => {
		if (state === 'DEFAULT') return;

		return css`
			border-color: ${colors.text.warning};

			&:focus {
				border-color: ${colors.text.warning};
			}

			&:hover {
				border-color: ${colors.text.warning};
			}
		`;
	}};
`;

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
	${({ theme: { colors } }) => ({
		color: colors.text.secondary,
	})}
	word-break: break-all;

	& ol {
		padding-left: 40px;
		margin: 18px 0;
	}

	& ul {
		padding-left: 40px;
		margin: 18px 0;
	}

	& ol li {
		list-style: decimal;
	}

	& ul li {
		list-style: disc;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 26px;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 8px;
`;

const Message = styled.p`
	position: absolute;
	margin: 4px 0 0 0;
	color: ${({ theme: { colors } }) => colors.text.warning};

	${Caption}
`;

const TitleContainer = styled.div`
	margin-bottom: 30px;
`;
