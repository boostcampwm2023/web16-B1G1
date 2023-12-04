import { Button, Input, Modal } from 'shared/ui';
import { useState } from 'react';
import styled from '@emotion/styled';
import checkIcon from '@icons/icon-check-purple.svg';
import { Body02ME, Body03ME } from 'shared/ui/styles';
import { useToastStore } from 'shared/store';

export default function ShareModal() {
	const [isSearchable, setIsSearchable] = useState(false);
	const [shareLink, setShareLink] = useState('링크임당');

	const { setText } = useToastStore();

	const rightButton = (
		<Button buttonType="CTA-icon" size="m" type="submit">
			적용
		</Button>
	);

	const handleGoBackButton = () => {};

	const handleCheckBox = () => setIsSearchable(!isSearchable);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(shareLink);
		setText('링크가 복사되었습니다.');
	};

	return (
		<Modal
			title="공유하기"
			description="링크를 복사하고 친구들에게 공유해보세요"
			rightButton={rightButton}
			onClickGoBack={handleGoBackButton}
		>
			<SearchSetContainer>
				<SearchSetLabel>검색 허용</SearchSetLabel>
				<SearchSetCheckBox
					type="checkbox"
					checked={isSearchable}
					onChange={handleCheckBox}
				/>
				<SearchSetDescription>
					{isSearchable
						? '다른 사람이 내 은하를 검색할 수 있습니다.'
						: '다른 사람이 내 은하를 검색할 수 없습니다.'}
				</SearchSetDescription>
			</SearchSetContainer>

			<LinkContainer>
				<Input
					id="share-link"
					type="url"
					disabled
					placeholder=""
					value={shareLink}
					style={{ width: '200px' }}
				/>
				<Button size="m" buttonType="CTA-icon" onClick={copyToClipboard}>
					복사
				</Button>
			</LinkContainer>
		</Modal>
	);
}

const SearchSetContainer = styled.div`
	display: flex;
	align-items: center;
`;

const SearchSetLabel = styled.label`
	font-size: 16px;
	color: ${({ theme: { colors } }) => colors.text.secondary};
	margin-right: 16px;

	${Body03ME}
`;

const SearchSetDescription = styled.p`
	font-size: 14px;
	color: ${({ theme: { colors } }) => colors.text.secondary};
	margin-top: 4px;

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

const LinkContainer = styled.div`
	display: flex;
	align-items: center;
`;
