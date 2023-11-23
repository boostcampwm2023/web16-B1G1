import { Button } from 'shared/ui';

interface PropsType {
	onClick: () => void;
}

export default function LeftButton({ onClick }: PropsType) {
	return (
		<Button onClick={onClick} size="m" buttonType="Button">
			회원가입
		</Button>
	);
}
