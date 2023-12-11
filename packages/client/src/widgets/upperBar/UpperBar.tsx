import styled from '@emotion/styled';
import { IconButton, Search } from 'shared/ui';
import goBackIcon from '@icons/icon-back-32-white.svg';
import { MAX_WIDTH1, MAX_WIDTH2 } from '@constants';
import { useState, useEffect } from 'react';
import { checkExistNickname, getNickNames } from 'shared/apis/search';
import { useToastStore, useViewStore } from 'shared/store';
import { useNavigate } from 'react-router-dom';
import useCheckNickName from 'shared/hooks/useCheckNickName';

export default function UpperBar() {
	// TODO: ui 분리하기
	const [searchValue, setSearchValue] = useState('');
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(false);

	const { setToast } = useToastStore();
	const { page, nickName, owner } = useCheckNickName();
	const { view } = useViewStore();

	const navigate = useNavigate();

	const DEBOUNCE_TIME = 200;

	useEffect(() => {}, [page, nickName]);

	useEffect(() => {
		const debounce = setTimeout(() => {
			setDebouncedSearchValue(searchValue);
		}, DEBOUNCE_TIME);

		return () => clearTimeout(debounce);
	}, [searchValue]);

	useEffect(() => {
		if (!debouncedSearchValue) {
			setSearchResults([]);
			return;
		}

		(async () => {
			const nickNameDatas = await getNickNames(debouncedSearchValue);
			const nickNames = nickNameDatas
				.map((data: { nickname: string; id: number }) => data.nickname)
				.filter((nickName: string) => nickName !== owner)
				.slice(0, 5);

			setSearchResults(nickNames);
		})();
	}, [debouncedSearchValue]);

	const handleSearchButton = async () => {
		if (isSearchButtonDisabled) return;
		setIsSearchButtonDisabled(true);
		try {
			await checkExistNickname(searchValue);
			navigate(`/search/${searchValue}`);
			setSearchValue('');
			setDebouncedSearchValue('');
			setSearchResults([]);
		} catch (error) {
			if (searchValue === owner)
				return setToast({
					text: '내 은하로는 이동할 수 없습니다.',
					type: 'error',
				});
			return setToast({
				text: '존재하지 않는 유저입니다.',
				type: 'error',
			});
		} finally {
			setIsSearchButtonDisabled(false);
		}
	};

	const iconButtonVisibility = page === 'home' ? 'hidden' : 'visible';

	const handleGoBackButton = () => {
		if (page === 'guest') {
			navigate('/');
			return;
		}

		navigate('/home');
	};

	return (
		<Layout view={view}>
			<IconButton
				onClick={handleGoBackButton}
				style={{ visibility: iconButtonVisibility }}
			>
				<img src={goBackIcon} alt="뒤로가기" />
			</IconButton>

			<div className="search-bar">
				<SearchBar
					onSubmit={handleSearchButton}
					inputState={searchValue}
					setInputState={setSearchValue}
					placeholder="닉네임을 입력하세요"
					results={searchResults}
					disabled={isSearchButtonDisabled}
				/>
			</div>
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

const SearchBar = styled(Search)`
	width: 320px;
`;
