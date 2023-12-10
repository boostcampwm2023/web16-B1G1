import { useState } from 'react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
	const [password, setPassword] = useState('');
	const [loginResult, setLoginResult] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const response = await fetch(baseUrl + '/admin/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password }),
		});

		if (response.ok) {
			setLoginResult('로그인 성공');
		} else {
			setLoginResult('로그인 실패');
		}
	};

	const handleLogout = async () => {
		const response = await fetch(baseUrl + '/admin/signout');
		if (response.ok) {
			setLoginResult('로그아웃 되었습니다.');
		}
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<input type="password" value={password} onChange={handleChange} />
				<button type="submit">로그인</button>
			</form>
			<span>{loginResult}</span>
			<button onClick={handleLogout}>로그아웃</button>
		</div>
	);
}
