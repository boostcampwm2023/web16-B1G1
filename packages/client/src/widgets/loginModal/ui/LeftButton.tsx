import { Button } from 'shared/ui';

export default function LeftButton() {
	return (
		<Button
			onClick={() => console.log('left button')}
			size="m"
			buttonType="Button"
		>
			회원가입
		</Button>
	);
}
