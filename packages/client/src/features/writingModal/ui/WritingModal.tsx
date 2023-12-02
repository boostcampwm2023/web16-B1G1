import { useState } from 'react';
import { Button, Modal } from 'shared/ui';
import TextArea from 'shared/ui/textArea/TextArea';
import { ModalPortal } from 'shared/ui';
import Images from './Images';
import { useNavigate } from 'react-router-dom';
import { sendPost } from '../api/sendPost';
import { useViewStore } from 'shared/store';
import InputBar from 'shared/ui/inputBar/InputBar';

export default function WritingModal() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [files, setFiles] = useState<FileList | null>(null);
	const navigate = useNavigate();
	const { setView } = useViewStore();

	const handleSendPost = async () => {
		const response = await sendPost(title, content, files);
		if (response!.status === 201) {
			navigate('/home');
			// TODO: home에서 별 정보 refetching
		} else {
			alert('글쓰기 실패');
		}
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
				<InputBar
					id={'postTitle'}
					placeholder="제목"
					style={{ marginBottom: '30px' }}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextArea onChange={(content) => setContent(content)} height="40vh" />
			</Modal>
		</ModalPortal>
	);
}
