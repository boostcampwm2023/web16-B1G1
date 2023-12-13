import styled from '@emotion/styled';
import ImageIcon from '@icons/icon-photo-32-gray.svg?react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface PropsType {
	files: FileList | null;
	setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}

export default function Images({ files, setFiles }: PropsType) {
	const [showImages, setShowImages] = useState<string[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputKey, setInputKey] = useState(0);

	const handleAddImages = (event: ChangeEvent<HTMLInputElement>) => {
		const currentFiles = event.target.files;
		if (!currentFiles) return;
		if (currentFiles.length > 5) return;
		const images = Array.from(currentFiles).map((file) =>
			URL.createObjectURL(file),
		);
		setShowImages(images);
		setFiles(currentFiles);

		setInputKey((prevKey) => (prevKey + 1) % 2);
	};

	const handleDeleteImage = (id: number) => {
		const newImages = showImages.filter((_, index) => index !== id);
		setShowImages(newImages);

		const dataTransfer = new DataTransfer();
		Array.from(files!)
			.filter((_, index) => index !== id)
			.forEach((file) => dataTransfer.items.add(file));
		setFiles(dataTransfer.files);
	};

	return (
		<Container>
			<input
				type="file"
				id="input-file"
				accept="image/png, image/jpeg, image/jpg"
				multiple
				onChange={handleAddImages}
				hidden
				ref={inputRef}
				key={inputKey}
			/>
			<IconWrapper onClick={() => inputRef.current?.click()}>
				<ImageIcon />
			</IconWrapper>

			{showImages.map((image, id) => (
				<div key={id}>
					<ImagePreview
						src={image}
						alt={`${image}-${id}`}
						onClick={() => handleDeleteImage(id)}
					/>
				</div>
			))}
		</Container>
	);
}

const ImagePreview = styled.img`
	width: 80px;
	height: 80px;
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
`;

const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80px;
	height: 80px;
	border: 1px solid ${({ theme }) => theme.colors.stroke.default};
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.background.bdp01_80};
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary.hover};
		border: 1px solid ${({ theme }) => theme.colors.action.hover};
	}
`;
