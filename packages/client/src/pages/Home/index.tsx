import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useViewStore';
import { usePostStore } from 'shared/store/usePostStore';
import PostModal from 'features/postModal/PostModal';
import { Outlet } from 'react-router-dom';

export default function Home() {
	const { view } = useViewStore();
	const { data } = usePostStore();

	return (
		<>
			<Outlet />
			{view === 'POST' && <PostModal data={data} />}
			<Screen />
		</>
	);
}
