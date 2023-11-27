import ImageIcon from '@icons/icon-photo-32-gray.svg?react';
import { useState, ChangeEvent, useRef } from 'react';
import { IconButton } from 'shared/ui';
import styled from '@emotion/styled';

interface PropsType {
	onModify: (files: FileList | null) => void;
}

export default function Images({ onModify }: PropsType) {
	const [showImages, setShowImages] = useState<string[]>([]);
	const [files, setFiles] = useState<FileList | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAddImages = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;
		const images = Array.from(files).map((file) => URL.createObjectURL(file));
		setShowImages(images);
		setFiles(files);
		onModify(files);
	};

	const handleDeleteImage = (id: number) => {
		const newImages = showImages.filter((_, index) => index !== id);
		setShowImages(newImages);

		const dataTransfer = new DataTransfer();
		Array.from(files!)
			.filter((_, index) => index !== id)
			.forEach((file) => dataTransfer.items.add(file));
		setFiles(dataTransfer.files);
		onModify(dataTransfer.files);
	};

	return (
		<Container>
			<input
				type="file"
				id="input-file"
				multiple
				onChange={handleAddImages}
				hidden
				ref={inputRef}
			/>
			<IconButton onClick={() => inputRef.current?.click()}>
				<ImageIcon />
			</IconButton>

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
	width: 40px;
	height: 40px;
	border-radius: 8px;
	cursor: pointer;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
`;
