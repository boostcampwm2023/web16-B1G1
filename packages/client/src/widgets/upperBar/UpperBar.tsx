import styled from '@emotion/styled';
import { IconButton, Search } from 'shared/ui';
import goBackIcon from '@icons/icon-back-32-white.svg';
import { MAX_WIDTH1, MAX_WIDTH2 } from '@constants';
import { useState, useEffect } from 'react';
import { getNickNames } from 'shared/apis/search';
import { useScreenSwitchStore } from 'shared/store/useScreenSwitchStore';
import { useOwnerStore } from 'shared/store/useOwnerStore';
import Cookies from 'js-cookie';

export default function UpperBar() {
	// TODO: ui 분리하기
	const [searchValue, setSearchValue] = useState('');
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const { isMyPage, setIsMyPage } = useOwnerStore();
	const { setIsSwitching } = useScreenSwitchStore();
	const { setPageOwnerNickName } = useOwnerStore();

	const userNickName = Cookies.get('nickname');

	const DEBOUNCE_TIME = 200;

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
				.filter((nickName: string) => nickName !== userNickName)
				.slice(0, 5);

			setSearchResults(nickNames);
		})();
	}, [debouncedSearchValue]);

	const handleSearchButton = async () => {
		setPageOwnerNickName(debouncedSearchValue);

		setSearchValue('');
		setDebouncedSearchValue('');
		setSearchResults([]);

		setIsMyPage(false);
		setIsSwitching(true);
	};

	const iconButtonVisibility = isMyPage ? 'hidden' : 'visible';

	const handleGoBackButton = () => {
		setIsMyPage(true);
		setIsSwitching(true);
		setPageOwnerNickName(userNickName!);
	};

	return (
		<Layout>
			<IconButton
				onClick={handleGoBackButton}
				style={{ visibility: iconButtonVisibility }}
			>
				<img src={goBackIcon} alt="뒤로가기" />
			</IconButton>

			<SearchBar
				onSubmit={handleSearchButton}
				inputState={searchValue}
				setInputState={setSearchValue}
				placeholder="닉네임을 입력하세요"
				results={searchResults}
			/>
		</Layout>
	);
}

const Layout = styled.div`
	position: absolute;
	left: 50%;
	top: 30px;
	z-index: 50;
	transform: translateX(-50%);

	display: flex;
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
