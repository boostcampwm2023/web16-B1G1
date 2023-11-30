import styled from '@emotion/styled';
import searchIcon from '@icons/icon-search-24-white.svg';
import { Body03ME } from '../styles';
import { Button } from 'shared/ui';

interface PropsTypes {
	onClick: () => void;
	placeholder?: string;
	inputState: string;
	setInputState: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search({
	onClick,
	inputState,
	setInputState,
	placeholder = '',
	...args
}: PropsTypes) {
	const onChangeSearchInput = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		setInputState(target.value);
	};

	return (
		<Layout {...args}>
			<img src={searchIcon} alt="돋보기 아이콘" />

			<SearchInput
				placeholder={placeholder}
				onChange={onChangeSearchInput}
				value={inputState}
			/>

			{inputState ? (
				<Button onClick={onClick} size="m" buttonType="CTA-icon" type="submit">
					버튼
				</Button>
			) : (
				<Button
					onClick={onClick}
					size="m"
					buttonType="CTA-icon"
					type="submit"
					disabled
				>
					버튼
				</Button>
			)}
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border-radius: 8px;
	padding: 8px;
	background-color: ${({ theme: { colors } }) => colors.background.bdp01_80};
	border: 1px solid ${({ theme: { colors } }) => colors.stroke.default};

	:hover {
		border: 1px solid ${({ theme: { colors } }) => colors.stroke.focus_80};
	}
`;

const SearchInput = styled.input`
	border: none;
	background-color: transparent;
	outline: none;
	margin: 0 8px;
	flex: 1;
	color: ${({ theme: { colors } }) => colors.text.primary};
	${Body03ME}

	::placeholder {
		color: ${({ theme: { colors } }) => colors.text.disabled};
	}
`;
