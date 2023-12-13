import { Heart } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from 'shared/apis';
import { theme } from 'shared/styles';
import { AlertDialog, Button } from 'shared/ui';

interface PropsType {
	postId: string;
	count: number;
}

const LIKE = 'LIKE';
const UNLIKE = 'UNLIKE';
const SET_LIKE = 'SET_LIKE';

const likeReducer = (
	state: { isLiked: boolean; likeCount: number },
	action: { type: string; bool?: boolean },
): { isLiked: boolean; likeCount: number } => {
	switch (action.type) {
		case LIKE:
			return {
				...state,
				isLiked: true,
				likeCount: state.likeCount + 1,
			};
		case UNLIKE:
			return {
				...state,
				isLiked: false,
				likeCount: state.likeCount - 1,
			};
		case SET_LIKE:
			return {
				...state,
				isLiked: action.bool ?? state.isLiked,
			};
		default:
			return state;
	}
};

export default function Like({ postId, count }: PropsType) {
	const [state, dispatch] = useReducer(likeReducer, {
		isLiked: false,
		likeCount: count,
	});
	const [isButtonDisabled, setButtonDisabled] = useState(false);
	const [alert, setAlert] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchLike = async () => {
			const { data } = await instance({
				method: 'GET',
				url: `/post/${postId}/is-liked`,
			});
			dispatch({ type: SET_LIKE, bool: data });
		};
		fetchLike();
	}, []);

	const clickLike = async () => {
		if (isButtonDisabled) return;
		setButtonDisabled(true);

		const path = location.pathname.split('/')[1];
		if (path === 'guest') {
			setAlert(true);
			setButtonDisabled(false);
			return;
		}

		try {
			await instance({
				method: 'patch',
				url: `/post/${postId}/like`,
			});
			dispatch({ type: LIKE });
		} finally {
			setButtonDisabled(false);
		}
	};

	const cancelLike = async () => {
		if (isButtonDisabled) return;

		try {
			setButtonDisabled(true);
			await instance({
				method: 'patch',
				url: `/post/${postId}/unlike`,
			});
			dispatch({ type: UNLIKE });
		} finally {
			setButtonDisabled(false);
		}
	};

	return (
		<>
			<Button
				size="m"
				buttonType={state.isLiked ? 'warning-border' : 'Button'}
				onClick={state.isLiked ? cancelLike : clickLike}
				disabled={isButtonDisabled}
			>
				<Heart
					style={{ marginRight: '10px' }}
					color={
						state.isLiked
							? theme.colors.warning.pressed
							: theme.colors.stroke.default
					}
					fill={state.isLiked ? theme.colors.warning.pressed : 'none'}
				/>
				{state.likeCount}
			</Button>
			{alert && (
				<AlertDialog
					title="로그인이 필요한 기능입니다."
					cancelButtonText="취소"
					actionButtonText="로그인"
					onClickCancelButton={() => setAlert(false)}
					onClickActionButton={() => {
						setAlert(false);
						navigate('/login');
					}}
					disabled={false}
				/>
			)}
		</>
	);
}
