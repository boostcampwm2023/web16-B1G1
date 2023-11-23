import { Button } from 'shared/ui';

interface PropsType {
	onClick: () => void;
}

export default function LeftButton({ onClick }: PropsType) {
	return (
		<Button onClick={onClick} size="m" buttonType="Button" type="button">
			회원가입
		</Button>
	);
}
