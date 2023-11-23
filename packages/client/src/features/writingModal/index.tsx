import { useState } from 'react';
import { Button, IconButton, Modal } from 'shared/ui';
import TextArea from 'shared/ui/textArea/TextArea';
import ImageIcon from '@icons/icon-photo-32-gray.svg?react';
import { ModalPortal } from 'shared/ui';
import { useViewStore } from 'shared/store/useWritingStore';
import styled from '@emotion/styled';

export default function WritingModal() {
	const [text, setText] = useState('');
	const { setView } = useViewStore();

	return (
		<ModalPortal>
			<WritingModalLayout
				title="글쓰기"
				rightButton={
					<Button
						onClick={() => console.log('Hi!')} // TODO: 서버로 보내기
						size="m"
						buttonType="CTA-icon"
					>
						다음
					</Button>
				}
				leftButton={
					<IconButton
						onClick={
							() => console.log('img') // TODO: 이미지 업로드
						}
					>
						<ImageIcon />
					</IconButton>
				}
				onClickGoBack={() => setView('DETAIL')}
			>
				<TextArea onChange={(text) => setText(text)} />
			</WritingModalLayout>
		</ModalPortal>
	);
}

const WritingModalLayout = styled(Modal)`
	transform: translate(-10%, -50%);
`;
