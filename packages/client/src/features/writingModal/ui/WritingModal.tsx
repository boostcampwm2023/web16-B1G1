import { useState } from 'react';
import { Button, Modal } from 'shared/ui';
import TextArea from 'shared/ui/textArea/TextArea';
import { ModalPortal } from 'shared/ui';
import Images from './Images';
import { useNavigate } from 'react-router-dom';
import { useViewStore, usePostStore } from 'shared/store';
import InputBar from 'shared/ui/inputBar/InputBar';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Caption } from 'shared/ui/styles';

type TextStateTypes = 'DEFAULT' | 'INVALID';

export default function WritingModal() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [files, setFiles] = useState<FileList | null>(null);
	const [titleState, setTitleState] = useState<TextStateTypes>('DEFAULT');
	const [contentState, setContentState] = useState<TextStateTypes>('DEFAULT');
	const navigate = useNavigate();
	const { setView } = useViewStore();
	const { setStoreTitle, setStoreContent, setStoreFiles } = usePostStore();

	const handleSendPost = async () => {
		if (title === '') return setTitleState('INVALID');
		if (content === '') return setContentState('INVALID');
		setStoreTitle(title);
		setStoreContent(content);
		setStoreFiles(files);
		navigate('/home/star-custom');
	};

	return (
		<ModalPortal>
			<Modal
				title="글쓰기"
				rightButton={
					<Button
						onClick={handleSendPost}
						size="m"
						buttonType="CTA-icon"
						type="submit"
					>
						다음
					</Button>
				}
				leftButton={<Images onModify={setFiles} />}
				onClickGoBack={() => {
					setView('MAIN');
					navigate('/home');
				}}
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
						height="40vh"
					/>
					{contentState === 'INVALID' && (
						<Message>내용을 입력해주세요.</Message>
					)}
				</ContentContainer>
			</Modal>
		</ModalPortal>
	);
}

const TitleContainer = styled.div`
	margin-bottom: 30px;
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
