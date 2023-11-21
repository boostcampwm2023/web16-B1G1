import { useState } from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import theme from '../styles/theme';
import { Body04Me } from '../styles';

interface PropsType {
	onChange: (text: string) => void;
	width?: number;
	height?: number;
	maxLength?: number;
}

export default function TextArea({
	onChange,
	width = 851,
	height = 406,
	maxLength = 1000,
}: PropsType) {
	const [tabIndex, setTabIndex] = useState(0);
	const [text, setText] = useState('');
	let isWrite = tabIndex === 0;
	let isPreview = tabIndex === 1;

	const handleTabClick = (index: number) => {
		setTabIndex(index);
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.currentTarget.value);
		onChange(text);
	};

	return (
		<Section width={width} height={height}>
			<Tabs>
				<Tab
					className={`${isWrite && 'selected'}`}
					onClick={() => handleTabClick(0)}
				>
					Write
				</Tab>
				<Tab
					className={`${isPreview && 'selected'}`}
					onClick={() => handleTabClick(1)}
				>
					Preview
				</Tab>
			</Tabs>
			{tabIndex === 0 && (
				<Container>
					<TextInput
						maxLength={maxLength}
						value={text}
						onChange={handleTextChange}
						css={scrollStyle}
					/>
					<LimitSpan>
						{text.length}/{maxLength}
					</LimitSpan>
				</Container>
			)}
			{tabIndex === 1 && (
				<Wrapper css={scrollStyle}>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
				</Wrapper>
			)}
		</Section>
	);
}

const Section = styled.section<{ width: number; height: number }>`
	${Body04Me}
	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;
	padding: 16px;
	background-color: ${theme.colors.background.bdp03};
	color: ${theme.colors.text.third};
	border-radius: 4px;
	border: 1px solid ${theme.colors.stroke.default};
	display: flex;
	flex-direction: column;
`;

const Tabs = styled.ul`
	display: flex;
	margin-bottom: 8px;
	gap: 12px;
	justify-content: flex-end;
	align-items: center;

	.selected {
		color: ${theme.colors.text.primary};
		font-size: large;
	}
`;

const Tab = styled.li`
	cursor: pointer;
	list-style: none;
`;

const TextInput = styled.textarea<{ css: SerializedStyles }>`
	${({ css }) => css}
	resize: none;
	background-color: ${theme.colors.background.bdp03};
	color: ${theme.colors.text.third};
	border: none;
	height: 100%;

	&:focus {
		outline: none;
		color: ${theme.colors.text.secondary};
	}
`;

const LimitSpan = styled.span`
	display: flex;
	justify-content: flex-end;
	margin-top: 4px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid ${theme.colors.stroke.default};
	border-radius: 4px;
	padding: 8px;
	height: 100%;
	overflow: auto;

	&:focus-within {
		border: 1px solid ${theme.colors.stroke.focus};
	}

	&:hover {
		border: 1px solid ${theme.colors.stroke.focus};
	}
`;

const Wrapper = styled.div<{ css: SerializedStyles }>`
	${({ css }) => css}
	display: flex;
	flex-direction: column;
	overflow: auto;
	padding: 8px;
	margin-top: 9px;
	margin-right: 9px;
`;

const scrollStyle = css`
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background-color: ${theme.colors.text.primary};
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${theme.colors.text.third};
		border-radius: 4px;
	}
`;
