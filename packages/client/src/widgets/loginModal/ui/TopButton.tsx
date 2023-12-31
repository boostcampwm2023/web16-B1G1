import RightArrow from '@icons/icon-arrow-right-17-white.svg?react';
import { useNavigate } from 'react-router-dom';
import { TextButton } from 'shared/ui';

export default function TopButton() {
	const navigate = useNavigate();

	const handleWatchExample = () => {
		navigate('/guest/96cebe82-c4bd-4ab7-b041-ba01e92afe4d');
	};

	return (
		<TextButton size="l" onClick={handleWatchExample} type="button">
			<p>예시 은하 구경하기</p>
			<RightArrow />
		</TextButton>
	);
}
