import Screen from 'widgets/screen';
import { useViewStore } from 'shared/store/useViewStore';
import { usePostStore } from 'shared/store/usePostStore';
import PostModal from 'features/postModal/PostModal';
import { Outlet } from 'react-router-dom';
import UnderBar from 'shared/ui/underBar/UnderBar';
import UpperBar from './ui/UpperBar';

export default function Home() {
	const { view } = useViewStore();
	const { data } = usePostStore();

	return (
		<>
			<Outlet />

			{view === 'POST' && <PostModal data={data} />}

			{view === 'MAIN' && (
				<>
					<UpperBar />
					<UnderBar />
				</>
			)}

			<Screen />
		</>
	);
}

// TODO: 내 은하에서는 MAIN의 뒤로가기 버튼 안보이게 하기
// TODO: 다른 사람 은하에서는 뒤로가기 버튼만 보이게 하기 ?
