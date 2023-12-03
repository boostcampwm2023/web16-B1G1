import styled from '@emotion/styled';
import searchIcon from '@icons/icon-search-24-white.svg';
import { Body03ME } from '../styles';
import { Button } from 'shared/ui';

interface PropsTypes {
	onClick: () => void;
	placeholder?: string;
	results?: string[];
	inputState: string;
	setInputState: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search({
	onClick,
	inputState,
	setInputState,
	placeholder = '',
	results = [],
	...args
}: PropsTypes) {
	const onChangeSearchInput = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		setInputState(target.value);
	};

	const resultsContents = results.map((result, index) => (
		<Result key={index}>{result}</Result>
	));

	return (
		<Layout {...args}>
			<InputLayout>
				<img src={searchIcon} alt="돋보기 아이콘" />

				<SearchInput
					placeholder={placeholder}
					onChange={onChangeSearchInput}
					value={inputState}
				/>

				<Button
					onClick={onClick}
					size="m"
					buttonType="CTA-icon"
					type="submit"
					disabled={!inputState}
				>
					검색
				</Button>
			</InputLayout>

			{results.length > 0 && <ResultsLayout>{resultsContents}</ResultsLayout>}
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border-radius: 8px;
	padding: 8px;
	gap: 8px;

	background-color: ${({ theme: { colors } }) => colors.background.bdp01_80};
	border: 1px solid ${({ theme: { colors } }) => colors.stroke.default};

	:hover {
		border: 1px solid ${({ theme: { colors } }) => colors.stroke.focus_80};
	}
`;

const InputLayout = styled.div`
	display: flex;
	width: 100%;
`;

const ResultsLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 8px 0 0 24px;
	border-top: 1px solid ${({ theme: { colors } }) => colors.stroke.default};
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

const Result = styled.div`
	display: flex;
	padding: 8px 10px;
	border-radius: 8px;
	cursor: pointer;

	color: ${({ theme: { colors } }) => colors.text.primary};
	${Body03ME}

	:hover {
		background-color: ${({ theme: { colors } }) => colors.background.bdp02};
	}
`;
