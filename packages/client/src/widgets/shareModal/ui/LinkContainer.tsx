import styled from '@emotion/styled';
import { useToastStore } from 'shared/store';
import { Button, Input } from 'shared/ui';
import { useState } from 'react';

export default function LinkContainer() {
	const [shareLink, setShareLink] = useState('링크임당');

	const { setText } = useToastStore();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(shareLink);
		setText('링크가 복사되었습니다.');
	};

	return (
		<Layout>
			<CopyButton size="m" buttonType="CTA-icon" onClick={copyToClipboard}>
				링크 복사
			</CopyButton>
			<Input
				id="share-link"
				type="url"
				disabled
				placeholder=""
				value={shareLink}
				style={{ width: '300px' }}
			/>
		</Layout>
	);
}

const Layout = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const CopyButton = styled(Button)`
	white-space: nowrap;
	height: 43px;
`;
