import { Modal } from 'shared/ui';
import { TopButton, LeftButton, RightButton, LoginContent } from './ui';
interface PropsType {
	changePage: React.Dispatch<{ type: 'NEXT' | 'PREV' }>;
}

export default function LoginModal({ changePage }: PropsType) {
	return (
		<Modal
			title="로그인"
			topButton={<TopButton onClick={() => changePage({ type: 'PREV' })} />}
			rightButton={<RightButton />}
			leftButton={<LeftButton onClick={() => changePage({ type: 'NEXT' })} />}
			onClickGoBack={() => changePage({ type: 'PREV' })}
			style={{ width: '516px' }}
		>
			<LoginContent />
		</Modal>
	);
}
