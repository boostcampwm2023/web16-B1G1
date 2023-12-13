import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkExistNickname, getNickNames } from 'shared/apis';
import { useToastStore } from 'shared/store';
import { Search } from 'shared/ui';

export default function SearchBar() {
	const [searchValue, setSearchValue] = useState('');
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(false);

	const { setToast } = useToastStore();

	const user = Cookies.get('userName');
	const navigate = useNavigate();

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
				.filter((nickName: string) => nickName !== user)
				.slice(0, 5);

			setSearchResults(nickNames);
		})();
	}, [debouncedSearchValue]);

	const handleSearchButton = async () => {
		if (isSearchButtonDisabled) return;
		setIsSearchButtonDisabled(true);

		try {
			const data = await checkExistNickname(searchValue);

			if (data.status === 'private')
				return setToast({
					text: '비공개 처리된 유저입니다.',
					type: 'error',
				});

			if (searchValue === user)
				return setToast({
					text: '내 은하로는 이동할 수 없습니다.',
					type: 'error',
				});

			navigate(`/search/${searchValue}`);
			setSearchValue('');
			setDebouncedSearchValue('');
			setSearchResults([]);
		} finally {
			setIsSearchButtonDisabled(false);
		}
	};

	return (
		<Layout
			onSubmit={handleSearchButton}
			inputState={searchValue}
			setInputState={setSearchValue}
			placeholder="닉네임을 입력하세요"
			results={searchResults}
			disabled={isSearchButtonDisabled}
		/>
	);
}

const Layout = styled(Search)`
	width: 320px;
`;
