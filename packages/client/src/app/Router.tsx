import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import { WritingModal } from 'features/writingModal';
import LoginModal from 'widgets/loginModal';
import SignUpModal from 'widgets/signupModal/SignUpModal';
import NickNameSetModal from 'widgets/nickNameSetModal/NickNameSetModal';
import LogoAndStart from 'widgets/logoAndStart';
import PostModal from 'features/postModal/PostModal';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Landing />}>
				<Route index element={<LogoAndStart />} />
				<Route path="login" element={<LoginModal />} />
				<Route path="signup" element={<SignUpModal />} />
				<Route path="nickname" element={<NickNameSetModal />} />
			</Route>

			<Route path="/home" element={<Home />}>
				<Route path=":postId">
					<Route path="detail" element={<PostModal />} />
				</Route>
				<Route path="writing" element={<WritingModal />} />
			</Route>
		</>,
	),
);
