import { Modal } from 'shared/ui';
import { useNavigate } from 'react-router-dom';
import { useToastStore, useViewStore } from 'shared/store';
import styled from '@emotion/styled';
import { SampleScreen } from './ui';
import { useState } from 'react';
import {
	STAR_DEFAULT_BRIGHTNESS,
	STAR_DEFAULT_COLOR,
	STAR_DEFAULT_SHAPE_INDEX,
	STAR_DEFAULT_SIZE,
} from './lib';
import ColorPickerContainer from './ui/ColorPickerContainer';
import { Button } from 'shared/ui';
import { usePostStore } from 'shared/store';
import { sendPost } from './apis/sendPost';
import SizeSlider from './ui/SizeSlider';
import BrightnessSlider from './ui/BrightnessSlider';
import { shapeTypes } from '@constants';
import SentimentButton from './ui/SentimentButton';
import { generateStarPosition } from './lib/generateStarPosition';
import { getMyPost } from 'entities/posts/apis/getMyPost';
import { useRefresh } from 'shared/hooks/useRefresh';

export default function StarCustomModal() {
	const { setView } = useViewStore();
	const { title, content, files } = usePostStore();

	const [shape, setShape] = useState(STAR_DEFAULT_SHAPE_INDEX);
	const [color, setColor] = useState(STAR_DEFAULT_COLOR);
	const [size, setSize] = useState(STAR_DEFAULT_SIZE);
	const [brightness, setBrightness] = useState(STAR_DEFAULT_BRIGHTNESS);
	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

	const navigate = useNavigate();
	const { setToast } = useToastStore();

	useRefresh('WRITING');

	const handleGoBack = () => {
		navigate('/home/writing');
	};

	const handleSubmit = async () => {
		if (isSubmitButtonDisabled) return;
		setIsSubmitButtonDisabled(true);
		const existingStars = await getMyPost();
		const starData = {
			shape: shapeTypes[shape],
			color,
			size,
			brightness,
			position: await generateStarPosition(existingStars, size),
		};
		const formData = new FormData();

		formData.append('star', JSON.stringify(starData));
		formData.append('title', title);
		formData.append('content', content);

		if (files) {
			for (let i = 0; i < files.length; i++) formData.append('file', files[i]);
		}

		const res = await sendPost(formData);
		if (res?.status === 201) {
			setToast({ text: '별을 생성했습니다.', type: 'success' });
			setView('MAIN');
			navigate('/home');
		}
		setIsSubmitButtonDisabled(false);
	};

	const rightButton = (
		<Button
			size="m"
			buttonType="CTA-icon"
			onClick={handleSubmit}
			disabled={isSubmitButtonDisabled}
		>
			저장
		</Button>
	);

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<Modal
				title="별 꾸미기"
				onClickGoBack={handleGoBack}
				rightButton={rightButton}
			>
				<ModalContents>
					<SampleScreen
						shape={shape}
						setShape={setShape}
						color={color}
						size={size}
						brightness={brightness}
					/>

					<CustomLayout>
						<ColorPickerContainer color={color} setColor={setColor} />
						<SentimentButton content={content} setColor={setColor} />
						<SizeSlider size={size} setSize={setSize} />
						<BrightnessSlider
							brightness={brightness}
							setBrightness={setBrightness}
						/>
					</CustomLayout>
				</ModalContents>
			</Modal>
		</form>
	);
}

const ModalContents = styled.div`
	display: flex;
	gap: 24px;
`;

const CustomLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	/* gap: 24px; */
`;
