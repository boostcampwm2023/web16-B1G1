import { Button } from 'shared/ui';

interface PropsType {
	disabled: boolean;
}

export default function RightButton({ disabled }: PropsType) {
	return (
		<Button size="m" buttonType="CTA-icon" type="submit" disabled={disabled}>
			저장
		</Button>
	);
}
