import { useState } from 'react';
import { Button, IconButton, Modal } from 'shared/ui';
import TextArea from 'shared/ui/textArea/TextArea';
import ImageIcon from '@icons/icon-photo-32-gray.svg?react';

export default function WritingModal() {
	const [text, setText] = useState('');

	return (
		<Modal
			title="글쓰기"
			rightButton={
				<Button
					onClick={() => console.log('Hi!')}
					size="m"
					buttonType="CTA-icon"
				>
					다음
				</Button>
			}
			leftButton={
				<IconButton onClick={() => console.log('img')}>
					<ImageIcon />
				</IconButton>
			}
			onClickGoBack={() => console.log('go back')}
		>
			<TextArea onChange={(text) => setText(text)} />
		</Modal>
	);
}
