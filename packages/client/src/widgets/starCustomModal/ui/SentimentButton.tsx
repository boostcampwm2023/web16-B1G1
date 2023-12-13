import styled from '@emotion/styled';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Body01ME } from 'shared/styles';
import { Button } from 'shared/ui';
import { getSentimentColor } from '../apis/getSentimentColor';

interface PropsType {
	content: string;
	setColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function SentimentButton({ content, setColor }: PropsType) {
	const [isHover, setIsHover] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const handleRecommendColor = async () => {
		if (isButtonDisabled) return;
		setIsButtonDisabled(true);
		try {
			const res = await getSentimentColor(content);
			setColor(res.data.color);
		} finally {
			setIsButtonDisabled(false);
		}
	};

	return (
		<Container>
			<InnerContainer>
				<Button
					size="m"
					buttonType="CTA-icon"
					onClick={handleRecommendColor}
					disabled={isButtonDisabled}
				>
					색상 추천
				</Button>
				<HelpCircleIcon
					size={24}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				/>
			</InnerContainer>
			{isHover && (
				<Description>
					AI가 글의 감정을
					<br /> 분석하여 색상을 <br />
					추천합니다.
				</Description>
			)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	height: 50px;
`;

const InnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Description = styled.div`
	color: ${({ theme }) => theme.colors.text.secondary};
	margin-bottom: 10px;
	padding: 10px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.background.bdp01_80};
	border: 1px solid ${({ theme }) => theme.colors.stroke.sc};
	text-align: center;
	width: 120px;
	z-index: 99;

	${Body01ME}
`;

const HelpCircleIcon = styled(HelpCircle)`
	color: ${({ theme }) => theme.colors.text.secondary};
	margin-left: 10px;
	cursor: pointer;
`;
