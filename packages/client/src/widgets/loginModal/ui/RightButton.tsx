import { Button } from 'shared/ui';

interface PropsType {
	onClick: () => void;
}

export default function RightButton({ onClick }: PropsType) {
	return (
		<Button onClick={onClick} size="m" buttonType="CTA-icon">
			로그인
		</Button>
	);
}
