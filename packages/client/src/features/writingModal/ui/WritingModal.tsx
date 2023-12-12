import { useState } from 'react';
import { Button, Modal } from 'shared/ui';
import TextArea from 'shared/ui/textArea/TextArea';
import Images from './Images';
import { useNavigate, useLocation } from 'react-router-dom';
import { useViewStore, usePostStore } from 'shared/store';
import InputBar from 'shared/ui/inputBar/InputBar';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Caption } from 'shared/ui/styles';
import { useRefresh } from 'shared/hooks/useRefresh';
import { AlertDialog } from 'shared/ui';

type TextStateTypes = 'DEFAULT' | 'INVALID';

export default function WritingModal() {
	const [titleState, setTitleState] = useState<TextStateTypes>('DEFAULT');
	const [contentState, setContentState] = useState<TextStateTypes>('DEFAULT');
	const navigate = useNavigate();
	const { setView } = useViewStore();
	const {
		title: storeTitle,
		setStoreTitle,
		content: storeContent,
		setStoreContent,
		files: storeFiles,
		setStoreFiles,
	} = usePostStore();
	const [isClose, setIsClose] = useState(false);
	const star = useLocation().state?.star;
	const [title, setTitle] = useState(star ? storeTitle : '');
	const [content, setContent] = useState(star ? storeContent : '');
	const [files, setFiles] = useState<FileList | null>(star ? storeFiles : null);

	useRefresh('WRITING');

	const handleSendPost = async () => {
		if (title === '') return setTitleState('INVALID');
		if (content === '') return setContentState('INVALID');
		setStoreTitle(title);
		setStoreContent(content);
		setStoreFiles(files);
		navigate('/home/star-custom', { state: { star } });
	};

	return (
		<>
			{isClose && (
				<AlertDialog
					title="메인화면으로 돌아가시겠습니까?"
					description="작성된 내용은 저장되지 않습니다."
					actionButtonText="돌아가기"
					cancelButtonText="머무르기"
					onClickActionButton={() => {
						setView('MAIN');
						navigate('/home');
					}}
					onClickCancelButton={() => setIsClose(false)}
					disabled={false}
				/>
			)}
			<Modal
				title="글쓰기"
				rightButton={
					<Button
						onClick={handleSendPost}
						size="m"
						buttonType="CTA-icon"
						type="button"
					>
						다음
					</Button>
				}
				onClickGoBack={() => setIsClose(true)}
			>
				<TitleContainer>
					<TitleInput
						id={'postTitle'}
						placeholder="제목"
						value={title}
						onChange={(e) => {
							setTitleState('DEFAULT');
							setTitle(e.target.value);
						}}
						state={titleState}
						autoComplete="off"
					/>
					{titleState === 'INVALID' && <Message>제목을 입력해주세요.</Message>}
				</TitleContainer>
				<ContentContainer state={contentState}>
					<TextArea
						onChange={(content) => {
							setContentState('DEFAULT');
							setContent(content);
						}}
						value={content}
						height="40vh"
					/>
					{contentState === 'INVALID' && (
						<Message>내용을 입력해주세요.</Message>
					)}
				</ContentContainer>
				<ImagesWrapper>
					<Images onModify={setFiles} />
				</ImagesWrapper>
			</Modal>
		</>
	);
}

const TitleContainer = styled.div`
	margin-bottom: 16px;
`;

const ContentContainer = styled.div<{ state: TextStateTypes }>`
	border: 1px solid;
	border-radius: 4px;
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

const TitleInput = styled(InputBar)<{ state: TextStateTypes }>`
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

const Message = styled.p`
	position: absolute;
	margin: 4px 0 0 0;
	color: ${({ theme: { colors } }) => colors.text.warning};

	${Caption}
`;

const ImagesWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 16px;
`;
