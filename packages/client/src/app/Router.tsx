import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Landing from '../pages/Landing/Landing';
import { WritingModal } from 'features/writingModal/WritingModal';
import LoginModal from 'widgets/loginModal/LoginModal';
import SignUpModal from 'widgets/signupModal/SignUpModal';
import NickNameSetModal from 'widgets/nickNameSetModal/NickNameSetModal';
import LogoAndStart from 'widgets/logoAndStart/LogoAndStart';
import { PostModal } from 'features/postModal';
import GalaxyCustomModal from 'widgets/galaxyCustomModal/GalaxyCustomModal';
import StarCustomModal from 'widgets/starCustomModal/StarCustomModal';
import ShareModal from 'widgets/shareModal/ShareModal';
import PrivateRoute from '../shared/routes/PrivateRoute';
import PublicRoute from 'shared/routes/PublicRoute';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Landing />}>
				<Route index element={<LogoAndStart />} />

				<Route path="/" element={<PublicRoute />}>
					<Route path="login" element={<LoginModal />} />
					<Route path="signup" element={<SignUpModal />} />
					<Route path="nickname" element={<NickNameSetModal />}>
						<Route path=":platform" />
					</Route>
				</Route>
			</Route>

			<Route path="/home" element={<PrivateRoute />}>
				<Route path="/home" element={<Home />}>
					<Route path=":postId">
						<Route path="detail" element={<PostModal />} />
					</Route>
					<Route path="writing" element={<WritingModal />} />
					<Route path="galaxy-custom" element={<GalaxyCustomModal />} />
					<Route path="star-custom" element={<StarCustomModal />} />
					<Route path="share" element={<ShareModal />} />
				</Route>
			</Route>

			<Route path="/guest" element={<Home />}>
				<Route path=":hostId">
					<Route path=":postId">
						<Route path="detail" element={<PostModal />} />
					</Route>
				</Route>
			</Route>

			<Route path="/search" element={<PrivateRoute />}>
				<Route path="/search" element={<Home />}>
					<Route path=":hostId">
						<Route path=":postId">
							<Route path="detail" element={<PostModal />} />
						</Route>
					</Route>
				</Route>
			</Route>
		</>,
	),
);
