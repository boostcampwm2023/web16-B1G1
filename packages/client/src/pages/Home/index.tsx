import { WritingModal } from 'features/writingModal';
import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useWritingStore';
import SignUpModal from 'widgets/signupModal/SignUpModal';

export default function Home() {
	const { view } = useViewStore();

	return (
		<>
			{/* {view === 'WRITING' && <WritingModal />}
			<Screen /> */}
			<SignUpModal />
		</>
	);
}
