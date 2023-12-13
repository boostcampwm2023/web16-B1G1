import { MAX_WIDTH1, MAX_WIDTH2 } from '@constants';
import styled from '@emotion/styled';
import { useCheckNickName } from 'shared/hooks';
import { useViewStore } from 'shared/store';
import GoBackButton from './ui/GoBackButton';
import SearchBar from './ui/SearchBar';

export default function UpperBar() {
	const { page } = useCheckNickName();
	const { view } = useViewStore();

	return (
		<Layout view={view}>
			<GoBackButton page={page} />

			{page !== 'guest' && (
				<div className="search-bar">
					<SearchBar />
				</div>
			)}
		</Layout>
	);
}

const Layout = styled.div<{ view: string }>`
	position: absolute;
	left: 50%;
	top: 30px;
	z-index: 50;
	transform: translateX(-50%);

	display: ${({ view }) =>
		view === 'MAIN' || view === 'DETAIL' ? 'flex' : 'none'};
	justify-content: space-between;
	width: 1180px;

	@media (max-width: ${MAX_WIDTH1}px) {
		width: calc(100% - 30px);
	}

	@media (max-width: ${MAX_WIDTH2}px) {
		width: 1000px;
	}
`;
