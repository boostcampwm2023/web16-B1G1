import Screen from 'widgets/screen/Screen';
import { useViewStore } from 'shared/store/useViewStore';
import { Outlet } from 'react-router-dom';
import UnderBar from 'widgets/underBar/UnderBar';
import UpperBar from '../../widgets/upperBar/UpperBar';
import WarpScreen from 'widgets/warpScreen/WarpScreen';
import { useEffect } from 'react';
import { useScreenSwitchStore } from 'shared/store/useScreenSwitchStore';
import Cookies from 'js-cookie';
import { getGalaxy } from 'shared/apis';
import { useErrorStore, useGalaxyStore, useToastStore } from 'shared/store';
import { Toast } from 'shared/ui';
import {
	SPIRAL,
	GALAXY_THICKNESS,
	SPIRAL_START,
	ARMS_Z_DIST,
} from 'widgets/galaxy/lib/constants';
import Alert from 'shared/ui/alert/Alert';
import useCheckNickName from 'shared/hooks/useCheckNickName';

export default function Home() {
	const { view } = useViewStore();
	const { isSwitching } = useScreenSwitchStore();
	const { text } = useToastStore();
	const { message } = useErrorStore();
	const { nickName } = useCheckNickName();

	const { setSpiral, setStart, setThickness, setZDist } = useGalaxyStore();

	useEffect(() => {
		Cookies.set('nickname', nickName);

		getGalaxy(nickName).then((res) => {
			if (!res.spiral) setSpiral(SPIRAL);
			else setSpiral(res.spiral);

			if (!res.start) setStart(SPIRAL_START);
			else setStart(res.start);

			if (!res.thickness) setThickness(GALAXY_THICKNESS);
			else setThickness(res.thickness);

			if (!res.zDist) setZDist(ARMS_Z_DIST);
			else setZDist(res.zDist);
		});
	}, [nickName]);

	return (
		<>
			<Outlet />

			{message && <Alert title={message} />}
			{isSwitching && <WarpScreen />}
			{text && <Toast>{text}</Toast>}

			{view === 'MAIN' && (
				<>
					<UpperBar />
					<UnderBar />
				</>
			)}

			<Screen />
		</>
	);
}
