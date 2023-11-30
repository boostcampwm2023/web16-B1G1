import { Button } from 'shared/ui';

interface PropsType {
	disabled: boolean;
}

export default function RightButton({ disabled }: PropsType) {
	return (
		<Button size="m" buttonType="CTA-icon" disabled={disabled} type="submit">
			로그인
		</Button>
	);
}
