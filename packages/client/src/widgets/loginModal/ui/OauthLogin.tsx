import styled from '@emotion/styled';
import GithubLogo from 'assets/logos/Github.png';
import GoogleLogo from 'assets/logos/Google.png';
import NaverLogo from 'assets/logos/Naver.png';
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL, NAVER_AUTH_URL } from '../lib';

export default function OauthLogin() {
	return (
		<Container>
			<a href={NAVER_AUTH_URL}>
				<img src={NaverLogo} alt="네이버로 로그인" />
			</a>
			<a href={GITHUB_AUTH_URL}>
				<img src={GithubLogo} alt="깃허브로 로그인" />
			</a>
			<a href={GOOGLE_AUTH_URL}>
				<img src={GoogleLogo} alt="구글로 로그인" />
			</a>
		</Container>
	);
}

const Container = styled.div`
	margin: 20px 0 0 0;
	display: flex;
	justify-content: space-evenly;

	img {
		height: 54px;
	}
`;
