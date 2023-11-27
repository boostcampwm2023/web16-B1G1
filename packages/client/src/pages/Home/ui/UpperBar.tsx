import styled from '@emotion/styled';
import { IconButton, Search } from 'shared/ui';
import goBackIcon from '@icons/icon-back-32-white.svg';
import { MAX_WIDTH1, MAX_WIDTH2 } from '@constants';
import { useState } from 'react';

export default function UpperBar() {
	const [temp, setTemp] = useState('');

	return (
		<Layout>
			<IconButton onClick={() => {}}>
				<img src={goBackIcon} alt="뒤로가기" />
			</IconButton>

			<SearchBar
				onClick={() => {}}
				inputState={temp}
				setInputState={setTemp}
				placeholder="닉네임을 입력하세요"
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
