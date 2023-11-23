import { WritingModal } from 'features/writingModal';
import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useWritingStore';

export default function Home() {
	const { view } = useViewStore();

	return (
		<>
			{view === 'WRITING' && <WritingModal />}
			<Screen />
		</>
	);
}
