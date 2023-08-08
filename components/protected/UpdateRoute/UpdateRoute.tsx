import {memo, useEffect} from 'react';

import {updateRouterPrev} from '~/redux/reducer/site';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';

function UpdateRoute() {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		return () => {
			if (router.asPath !== '/auth/login' && router.asPath !== '/auth/register') {
				dispatch(updateRouterPrev(router.asPath));
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router, dispatch]);
	return null;
}

export default memo(UpdateRoute);
