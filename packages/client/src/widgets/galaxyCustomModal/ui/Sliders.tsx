import styled from '@emotion/styled';
import { useCustomStore } from 'shared/store';
import { Slider } from 'shared/ui';

export default function Sliders() {
	const {
		spiral,
		setSpiral,
		start,
		setStart,
		zDist,
		setZDist,
		thickness,
		setThickness,
	} = useCustomStore();
	return (
		<Container>
			<Slider
				id="나선팔 꼬인 정도"
				min={0.2}
				max={3}
				step={0.1}
				value={spiral}
				setValue={setSpiral}
			/>
			<Slider
				id="나선팔 두께"
				min={100}
				max={2000}
				step={50}
				value={zDist}
				setValue={setZDist}
			/>
			<Slider
				id="막대 길이"
				min={100}
				max={5000}
				step={100}
				value={start}
				setValue={setStart}
			/>
			<Slider
				id="은하 높이"
				min={100}
				max={1000}
				step={50}
				value={thickness}
				setValue={setThickness}
			/>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;
