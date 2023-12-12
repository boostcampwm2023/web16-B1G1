interface ErrorMessageTypes {
	get: { [key: string]: string };
	post: { [key: string]: string };
	patch: { [key: string]: string };
	delete: { [key: string]: string };
}

export const errorMessage: ErrorMessageTypes = {
	get: {
		'/auth/check-signin': '로그인이 필요합니다.',
		'/auth/signout': '로그아웃에 실패했습니다.',
		'/auth/is-available-username': '이미 존재하는 아이디입니다.',
		'/auth/is-available-nickname': '이미 존재하는 닉네임입니다.',
		'/auth/search': '유저 목록 조회에 실패했습니다.',
		'/auth/sharelink': '공유 링크 생성에 실패했습니다.',
		'/post/[0-9]+': '글 조회에 실패했습니다.',
		'/post/[0-9]+/is-liked': '좋아요 여부 조회에 실패했습니다.',
		'/star': '글 목록 조회에 실패했습니다.',
		'/star/by-author': '글 목록 조회에 실패했습니다.',
		'/galaxy': '은하 형태 불러오기에 실패했습니다.',
		'/galaxy/by-nickname': '은하 형태 불러오기에 실패했습니다.',
	},

	post: {
		'/auth/signup': '회원가입에 실패했습니다.',
		'/auth/signin': '아이디 또는 비밀번호가 일치하지 않습니다.',
		'/auth/[a-zA-Z]+/signup': '회원가입에 실패했습니다.',
		'/post': '글 작성에 실패했습니다.',
		'/sentiment': '감정 분석에 실패했습니다.',
	},

	patch: {
		'/auth/status': '검색 허용 상태 변경에 실패했습니다.',
		'/post/[0-9]+': '글 수정에 실패했습니다.',
		'/post/[0-9]+/like': '좋아요에 실패했습니다.',
		'/post/[0-9]+/unlike': '좋아요 취소에 실패했습니다.',
		'/star/[0-9]+': '별 커스텀 수정에 실패했습니다.',
		'/galaxy': '은하 형태 변경에 실패했습니다.',
	},

	delete: {
		'/post/[0-9]+': '글 삭제에 실패했습니다.',
	},
};
