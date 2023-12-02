import styled from '@emotion/styled';
import NaverLogo from '@icons/logo/Naver.png';
import GithubLogo from '@icons/logo/Github.png';
import GoogleLogo from '@icons/logo/Google.png';
import { NAVER_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '../lib';

export default function OauthLogin() {
	return (
		<Container>
			<a href={NAVER_AUTH_URL}>
				<img src={NaverLogo} />
			</a>
			<a href={GITHUB_AUTH_URL}>
				<img src={GithubLogo} />
			</a>
			<a href={GOOGLE_AUTH_URL}>
				<img src={GoogleLogo} />
			</a>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: space-evenly;

	img {
		height: 54px;
	}
`;
