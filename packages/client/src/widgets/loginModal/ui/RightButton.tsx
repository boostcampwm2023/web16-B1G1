import { Button } from 'shared/ui';

export default function RightButton() {
	return (
		<Button
			onClick={() => console.log('right button')}
			size="m"
			buttonType="CTA-icon"
		>
			로그인
		</Button>
	);
}
