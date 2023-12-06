import styled from '@emotion/styled';
import { useToastStore } from 'shared/store';
import { Button, Input } from 'shared/ui';
import { useState, useEffect } from 'react';
import { getShareLink } from 'shared/apis/share';
import Cookies from 'js-cookie';

export default function LinkContainer() {
	const [shareLink, setShareLink] = useState('');

	const { setText } = useToastStore();

	useEffect(() => {
		const nickName = Cookies.get('nickname') as string;

		(async () => {
			const shareLinkData = await getShareLink(nickName);
			setShareLink(
				'https://www.xn--bj0b03z.site/' + 'guest/' + shareLinkData.link,
			);
		})();
	}, []);

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
