import Joyride, { Step } from 'react-joyride';
import { patchShareStatus } from 'shared/apis/share';

interface PropsType {
	isFirst: boolean;
}

export default function CoachMarker({ isFirst }: PropsType) {
	const steps: Step[] = [
		{
			target: 'body',
			content: (
				<div>
					<h3>별 하나에 글 하나 🌟</h3>
					<br />
					<p>"내 삶의 반짝이는 기억들을 우주에 담아보세요"</p>
					<br />
					<p>우리는 모두 형형색색의 기억들을 가지고 있습니다.</p>
					<br />
					<p>그 기억들을 눈으로 볼 수 있다면 얼마나 좋을까요?</p>
					<br />
					<p>이곳, 나만의 우주에서 기억을 별로 만들어 띄워보아요. ☺️</p>
				</div>
			),
			disableBeacon: true,
			placement: 'center',
			styles: {
				options: {
					width: 500,
				},
			},
		},
		{
			target: '.leva',
			content: (
				<div>
					<h3>우주 커스텀 🌌</h3>
					<br />
					<p>
						은하의 밝기,우주 블러효과 유무, 마우스의 휠 스피드를 변경할 수
						있습니다.
					</p>
					<p>우주를 나에게 맞게 수정해보세요.</p>
				</div>
			),
		},
		{
			target: '.search-bar',
			content: (
				<div>
					<h3>우주 검색 🔎</h3>
					<br />
					<p>다른 사람의 우주를 검색할 수 있습니다.</p>
					<p>각양각색의 기억들을 함께 탐험해볼까요?</p>
				</div>
			),
		},
		{
			target: '.writing-button',
			content: (
				<div>
					<h3>별 생성 ⭐️</h3>
					<br />
					<p>글을 작성하여 우주의 별로 띄울 수 있습니다.</p>
					<p>내 별의 모양, 색상, 밝기, 크기를 골라보아요.</p>
					<p>나의 기분에 맞는 색도 추천받을 수 있어요.</p>
				</div>
			),
		},
		{
			target: '.galaxy-custom-button',
			content: (
				<div>
					<h3>은하 커스텀 💫</h3>
					<br />
					<p>은하의 모양을 바꿀 수 있습니다.</p>
					<p>나만의 개성있는 은하를 만들어봐요!</p>
				</div>
			),
		},
		{
			target: '.share-button',
			content: (
				<div>
					<h3>우주 공유 🔗</h3>
					<br />
					<p>우주를 비공개로 설정하거나, 다른 사람에게 공유할 수 있습니다.</p>
					<p>혼자만의 비밀 이야기를 담아도 좋아요.</p>
					<p>사랑하는 사람과 함께하는 것도 좋아요. 🫶🏻</p>
				</div>
			),
		},
	];
	return (
		<Joyride
			steps={steps}
			continuous={true}
			showProgress={true}
			showSkipButton={true}
			disableOverlay={true}
			styles={{
				options: {
					arrowColor: '#6C55FACC',
					backgroundColor: '#6C55FACC',
					primaryColor: '#8874FFCC',
					textColor: '#FFFFFF',
				},
			}}
			callback={(data) => {
				if (data.type === 'tour:end' && isFirst) patchShareStatus('public');
			}}
		/>
	);
}
