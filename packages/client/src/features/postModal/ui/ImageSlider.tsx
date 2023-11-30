import { useState } from 'react';
import { ArrowBigLeft, ArrowBigRight, CircleDot, Circle } from 'lucide-react';
import styled from '@emotion/styled';

interface PropsType {
	imageUrls: string[];
}

export default function ImageSlider({ imageUrls }: PropsType) {
	const [imageIndex, setImageIndex] = useState(0);

	const handlePrev = () => {
		setImageIndex((index) => {
			if (index === 0) return imageUrls.length - 1;
			return index - 1;
		});
	};

	const handleNext = () => {
		setImageIndex((index) => {
			if (index === imageUrls.length - 1) return 0;
			return index + 1;
		});
	};

	const Dots = () => {
		return (
			<>
				{imageUrls.map((_, index) => (
					<Dot onClick={() => setImageIndex(index)}>
						{index === imageIndex ? <CircleDot /> : <Circle />}
					</Dot>
				))}
			</>
		);
	};

	return (
		<Layout>
			<CurrentImage>
				{imageUrls.map((url) => {
					return <Image key={url} src={url} index={imageIndex} />;
				})}
			</CurrentImage>
			<Button onClick={handlePrev} style={{ left: 0 }}>
				<ArrowBigLeft />
			</Button>
			<Button onClick={handleNext} style={{ right: 0 }}>
				<ArrowBigRight />
			</Button>
			<Pagination>
				<Dots />
			</Pagination>
		</Layout>
	);
}

const Layout = styled.div`
	position: relative;
`;

const CurrentImage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	overflow: hidden;
`;

const Image = styled.img<{ index: number }>`
	object-fit: cover;
	width: 100%;
	height: 100%;
	display: block;
	flex-shrink: 0;
	flex-grow: 0;
	translate: ${({ index }) => -100 * index}%;
	transition: translate 300ms ease-in-out;
`;

const Button = styled.button`
	all: unset;
	display: block;
	position: absolute;
	top: 0;
	bottom: 0;
	padding: 16px;
	cursor: pointer;
	transition: background-color 100ms ease-in-out;

	&:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}

	> * {
		stroke: white;
		fill: black;
		width: 32px;
		height: 32px;
	}
`;

const Pagination = styled.div`
	position: absolute;
	bottom: 8px;
	left: 50%;
	translate: -50%;
	display: flex;
	gap: 4px;
`;

const Dot = styled.button`
	all: unset;
	display: block;
	cursor: pointer;
	width: 16px;
	height: 16px;
	transition: scale 100ms ease-in-out;

	&:hover {
		scale: 1.2;
	}

	> * {
		stroke: white;
		fill: black;
		width: 100%;
		height: 100%;
	}
`;
