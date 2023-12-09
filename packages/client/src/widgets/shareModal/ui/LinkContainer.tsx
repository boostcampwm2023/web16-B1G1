import styled from '@emotion/styled';
import { useToastStore } from 'shared/store';
import { Button, Input } from 'shared/ui';
import { useState, useEffect } from 'react';
import { getShareLink } from 'shared/apis/share';
import useCheckNickName from 'shared/hooks/useCheckNickName';

export default function LinkContainer() {
	const [shareLink, setShareLink] = useState('');

	const { setToast } = useToastStore();

	const { owner } = useCheckNickName();

	useEffect(() => {
		(async () => {
			const shareLinkData = await getShareLink(owner);
			setShareLink(
				'https://www.xn--bj0b03z.site/' + 'guest/' + shareLinkData.link,
			);
		})();
	}, [owner]);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(shareLink);
		setToast({ text: '링크가 복사되었습니다.', type: 'success' });
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
