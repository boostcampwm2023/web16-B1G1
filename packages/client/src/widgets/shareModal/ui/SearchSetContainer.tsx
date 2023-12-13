import styled from '@emotion/styled';
import checkIcon from '@icons/icon-check-purple.svg';
import { Body02ME, Body03ME } from 'shared/styles';
import { SearchStatusType } from '../lib/types';

interface PropsTypes {
	searchStatus: SearchStatusType;
	setSearchStatus: React.Dispatch<React.SetStateAction<SearchStatusType>>;
}

export default function SearchSetContainer({
	searchStatus,
	setSearchStatus,
}: PropsTypes) {
	const handleCheckBox = () => {
		if (searchStatus === 'public') return setSearchStatus('private');
		return setSearchStatus('public');
	};

	const getIsSearchable = () => {
		if (searchStatus === 'public') return true;
		return false;
	};

	return (
		<Layout>
			<SearchSetLabel>검색 허용</SearchSetLabel>
			<SearchSetCheckBox
				type="checkbox"
				checked={getIsSearchable()}
				onChange={handleCheckBox}
			/>
			<SearchSetDescription>
				{getIsSearchable()
					? '다른 사람이 내 은하를 검색할 수 있습니다.'
					: '다른 사람이 내 은하를 검색할 수 없습니다.'}
			</SearchSetDescription>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	align-items: center;
	margin: 0 0 24px 0;
`;

const SearchSetLabel = styled.label`
	font-size: 16px;
	color: ${({ theme: { colors } }) => colors.text.primary};
	padding: 0 8px;
	margin: 0 12px 0 0;
	${Body03ME}
`;

const SearchSetDescription = styled.p`
	font-size: 14px;
	color: ${({ theme: { colors } }) => colors.text.secondary};
	margin: 0 0 0 10px;
	${Body02ME}
`;

const SearchSetCheckBox = styled.input`
	width: 23px;
	height: 23px;
	cursor: pointer;
	border-radius: 5px;
	background-color: white;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;

	&:checked {
		appearance: none;
		background-image: url(${checkIcon});
		background-size: 18px;
		background-repeat: no-repeat;
		background-position: center;
	}
`;
