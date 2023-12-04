import { useEffect, useReducer, useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from 'shared/ui';
import theme from 'shared/ui/styles/theme';
import { BASE_URL } from '@constants';
import { useFetch } from 'shared/hooks';
import instance from 'shared/apis/AxiosInterceptor';

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

	useEffect(() => {
		const fetchLike = async () => {
			const { data, error } = useFetch<boolean>(
				`${BASE_URL}post/${postId}/is-liked`,
			);
			if (error) return;
			dispatch({ type: SET_LIKE, bool: data });
		};
		fetchLike();
	}, []);

	const clickLike = async () => {
		if (isButtonDisabled) return;

		try {
			setButtonDisabled(true);
			const res = await instance({
				method: 'patch',
				url: `/post/${postId}/is-liked`,
			});
			if (res.status === 200) dispatch({ type: LIKE });
		} finally {
			setButtonDisabled(false);
		}
	};

	const cancelLike = async () => {
		if (isButtonDisabled) return;

		try {
			setButtonDisabled(true);
			const res = await instance({
				method: 'patch',
				url: `/post/${postId}/unlike`,
			});
			if (res.status === 200) dispatch({ type: UNLIKE });
		} finally {
			setButtonDisabled(false);
		}
	};

	return (
		<Button
			size="m"
			buttonType={state.isLiked ? 'warning-border' : 'Button'}
			onClick={state.isLiked ? cancelLike : clickLike}
			disabled={isButtonDisabled}
		>
			<Heart
				style={{ marginRight: '10px' }}
				color={state.isLiked ? 'red' : theme.colors.stroke.default}
			/>
			{state.likeCount}
		</Button>
	);
}
