import { useEffect } from 'react';
import { view } from 'shared/lib';
import { useViewStore } from 'shared/store';

export const useRefresh = (view: view) => {
	const { setView } = useViewStore();
	useEffect(() => {
		setView(view);
	}, []);
};
