import { CoachMarker } from 'features';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { getGalaxy } from 'shared/apis';
import { useCheckNickName } from 'shared/hooks';
import { WarpStateType } from 'shared/lib';
import {
	useCustomStore,
	useGalaxyStore,
	useToastStore,
	useViewStore,
} from 'shared/store';
import { Toast } from 'shared/ui';
import { Screen, UnderBar, UpperBar, WarpScreen } from 'widgets';
import {
	ARMS_Z_DIST,
	GALAXY_THICKNESS,
	SPIRAL,
	SPIRAL_START,
} from 'widgets/galaxy/lib/constants';

export default function Home() {
	const [isSwitching, setIsSwitching] = useState<WarpStateType>('end');
	const { text, type } = useToastStore();
	const { nickName, status } = useCheckNickName();

	const { setSpiral, setStart, setThickness, setZDist } = useGalaxyStore();
	const custom = useCustomStore();
	const location = useLocation();
	const { setView } = useViewStore();
	const { postId } = useParams();

	useEffect(() => {
		const path = location.pathname.split('/');
		if (path[1] === 'home' && path.length <= 2) setView('MAIN');
		else if (path[1] === 'home' && path.length === 3 && postId) setView('MAIN');
		else if (path[1] === 'guest' && path.length <= 4) setView('MAIN');
		else if (path[1] === 'search' && path.length <= 4) setView('MAIN');
	}, [location]);

	useEffect(() => {
		if (!JSON.parse(sessionStorage.getItem('isReload') ?? 'false'))
			setIsSwitching('warp');
		if (nickName === '') return;
		sessionStorage.setItem('isReload', 'false');

		getGalaxy(nickName).then((res) => {
			if (!res.spiral) setSpiral(SPIRAL);
			else {
				setSpiral(res.spiral);
				custom.setSpiral(res.spiral);
			}

			if (!res.start) setStart(SPIRAL_START);
			else {
				setStart(res.start);
				custom.setStart(res.start);
			}

			if (!res.thickness) setThickness(GALAXY_THICKNESS);
			else {
				setThickness(res.thickness);
				custom.setThickness(res.thickness);
			}

			if (!res.zDist) setZDist(ARMS_Z_DIST);
			else {
				setZDist(res.zDist);
				custom.setZDist(res.zDist);
			}
		});
	}, [nickName]);

	useEffect(() => {
		const setReload = () => sessionStorage.setItem('isReload', 'true');

		window.addEventListener('beforeunload', setReload);

		return () => window.removeEventListener('beforeunload', setReload);
	}, []);

	const keyDown = (e: KeyboardEvent) => {
		if (e.key === 'F9') document.documentElement.requestFullscreen();
		if (e.key === 'Escape') document.exitFullscreen();
	};

	useEffect(() => {
		window.addEventListener('keydown', keyDown);
		return () => {
			window.removeEventListener('keydown', keyDown);
		};
	}, []);

	return (
		<>
			<Outlet />
			{status === 'new' && <CoachMarker isFirst={true} />}
			{isSwitching !== 'end' && (
				<WarpScreen isSwitching={isSwitching} setIsSwitching={setIsSwitching} />
			)}
			{text && <Toast type={type}>{text}</Toast>}

			<UpperBar />
			<UnderBar />

			<Screen />
		</>
	);
}
