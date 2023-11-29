import { useViewStore } from 'shared/store/useViewStore';
import { Button, Modal, ModalPortal } from 'shared/ui';
import { PostData } from 'shared/lib/types/post';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from '@emotion/styled';
import { useState } from 'react';
import AlertDialog from 'shared/ui/alertDialog/AlertDialog';
import { BASE_URL } from '@constants';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface PropsType {
	data: PostData;
}

export default function PostModal({ data }: PropsType) {
	const { setView } = useViewStore();
	const [deleteModal, setDeleteModal] = useState(false);
	const { postId } = useParams();
	const navigate = useNavigate();

	const rightButton = (
		<Button
			size="m"
			buttonType={'warning-border'}
			type="button"
			onClick={() => {
				setDeleteModal(true);
			}}
		>
			삭제
		</Button>
	);

	const handleDelete = async () => {
		const res = await axios.delete(`${BASE_URL}/post/${postId}`);

		if (res.status === 200) {
			setDeleteModal(false);
			setView('MAIN');
			navigate('/home');
		}
	};

	return (
		<ModalPortal>
			<PostModalLayout
				title={data.title}
				rightButton={rightButton}
				onClickGoBack={() => {
					setView('DETAIL');
				}}
			>
				<ImageContainer>
					<Image
						src={
							data.images[0]
							// TODO: 여러 이미지 출력할 수 있는 Carousel 구현
						}
						alt="img"
					/>
				</ImageContainer>
				<TextContainer>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{data.content}
					</ReactMarkdown>
				</TextContainer>
			</PostModalLayout>
			{deleteModal && (
				<AlertDialog
					title="글을 삭제하시겠습니까?"
					description="삭제 시 복구할 수 없습니다."
					cancelButtonText="취소"
					actionButtonText="삭제"
					onClickCancelButton={() => {
						setDeleteModal(false);
					}}
					onClickActionButton={handleDelete}
				/>
			)}
		</ModalPortal>
	);
}

const PostModalLayout = styled(Modal)`
	transform: translate(-10%, -50%);
`;

const TextContainer = styled.div`
	overflow-y: auto;
	width: 807px;

	${({ theme: { colors } }) => ({
		color: colors.text.secondary,
	})}
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 26px;
`;

const Image = styled.img`
	width: 649px;
`;
