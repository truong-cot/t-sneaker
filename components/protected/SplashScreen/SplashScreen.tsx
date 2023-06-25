import {Fragment, useEffect} from 'react';
import {getItemStorage, setItemStorage} from '~/common/func/localStorage';
// import {setStateLogin, setToken} from '~/redux/reducer/auth';
import {useDispatch, useSelector} from 'react-redux';
import {PropsSplashScreen} from './interfaces';

// import {KEY_STORE} from '~/constants/mock/enum';
import Logo from '~/components/common/Logo';
// import {RootState} from '~/redux/store';
// import clsx from 'clsx';
// import {setAccountId, setInfoUser} from '~/redux/reducer/user';
// import {setCookie} from 'cookies-next';
// import {setLoading} from '~/redux/reducer/site';
import styles from './SplashScreen.module.scss';
import clsx from 'clsx';

function SplashScreen({}: PropsSplashScreen) {
	const loading = false;
	// const dispatch = useDispatch();
	// const {token, isLogin} = useSelector((state: RootState) => state.auth);
	// const {accountId} = useSelector((state: RootState) => state.user);
	// const {infoUser} = useSelector((state: RootState) => state.user);
	// const {loading, location} = useSelector((state: RootState) => state.site);

	// useEffect(() => {
	// 	(async () => {
	// 		// const state = await getItemStorage(KEY_STORE);
	// 		if (!!state) {
	// 			// setCookie(KEY_STORE, state);
	// 			// dispatch(setToken(state.token));
	// 			// dispatch(setAccountId(state.accountId));
	// 			// dispatch(setInfoUser(state.infoUser));
	// 			// dispatch(setStateLogin(state.isLogin));
	// 		}

	// 		// dispatch(setLoading(false));
	// 	})();
	// }, []);

	useEffect(() => {
		if (!loading) {
			// setItemStorage(KEY_STORE, {
			// 	token: token,
			// 	isLogin: isLogin,
			// 	accountId: accountId,
			// 	infoUser: infoUser,
			// 	location,
			// });
			// setCookie(KEY_STORE, {
			// 	token: token,
			// 	isLogin: isLogin,
			// 	infoUser: infoUser,
			// 	accountId: accountId,
			// 	location,
			// });
		}
	}, []);

	return (
		<Fragment>
			<div className={clsx(styles.container, {[styles.close]: !loading})}>
				<Logo className={styles.logo} />
			</div>
		</Fragment>
	);
}

export default SplashScreen;
