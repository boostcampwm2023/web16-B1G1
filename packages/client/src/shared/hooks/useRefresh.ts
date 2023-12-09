import { useEffect } from 'react';
import { useViewStore, view } from 'shared/store';

export const useRefresh = (view: view) => {
	const { setView } = useViewStore();
	useEffect(() => {
		setView(view);
	}, []);
};
