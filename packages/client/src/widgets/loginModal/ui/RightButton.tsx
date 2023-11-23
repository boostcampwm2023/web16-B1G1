import { Button } from 'shared/ui';
import { useLoginStore } from 'shared/store/userLoginStore';

export default function RightButton() {
	const { id, password } = useLoginStore();

	return (
		<Button
			// onClick={handleLoginClick}
			size="m"
			buttonType="CTA-icon"
			disabled={!(id.length && password.length)}
			type="submit"
		>
			로그인
		</Button>
	);
}
