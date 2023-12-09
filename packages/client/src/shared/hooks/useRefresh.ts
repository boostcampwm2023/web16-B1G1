import { useEffect } from 'react';
import { useViewStore } from 'shared/store';
import { view } from 'shared/lib/types/view';

export const useRefresh = (view: view) => {
	const { setView } = useViewStore();
	useEffect(() => {
		setView(view);
	}, []);
};
