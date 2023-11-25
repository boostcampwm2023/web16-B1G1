import { WritingModal } from 'features/writingModal';
import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useViewStore';
import { usePostStore } from 'shared/store/usePostStore';
import PostModal from 'features/postModal/PostModal';

export default function Home() {
	const { view } = useViewStore();
	const { data } = usePostStore();

	return (
		<>
			{view === 'WRITING' && <WritingModal />}
			{view === 'POST' && <PostModal data={data} />}
			<Screen />
		</>
	);
}
