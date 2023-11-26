import { WritingModal } from 'features/writingModal';
import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useViewStore';
import { usePostStore } from 'shared/store/usePostStore';
import PostModal from 'features/postModal/PostModal';
import UnderBar from 'shared/ui/underBar/UnderBar';
import UpperBar from './ui/UpperBar';

export default function Home() {
	const { view } = useViewStore();
	const { data } = usePostStore();

	return (
		<>
			{view === 'WRITING' && <WritingModal />}
			{view === 'POST' && <PostModal data={data} />}

			<UpperBar />
			<UnderBar />

			<Screen />
		</>
	);
}
