import { Home, Landing } from 'pages';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import { PrivateRoute, PublicRoute } from 'shared/routes';
import {
	FallBackComponent,
	GalaxyCustomModal,
	LoginModal,
	LogoAndStart,
	NickNameSetModal,
	PostModal,
	ShareModal,
	SignUpModal,
	StarCustomModal,
	WritingModal,
} from 'widgets';

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
				<Route path=":hostNickname">
					<Route path=":postId">
						<Route path="detail" element={<PostModal />} />
					</Route>
				</Route>
			</Route>

			<Route path="/search" element={<PrivateRoute />}>
				<Route path="/search" element={<Home />}>
					<Route path=":hostNickname">
						<Route path=":postId">
							<Route path="detail" element={<PostModal />} />
						</Route>
					</Route>
				</Route>
			</Route>

			<Route path="*" element={<FallBackComponent />} />
		</>,
	),
);
