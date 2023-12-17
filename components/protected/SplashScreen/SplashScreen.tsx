import {Fragment, useEffect} from 'react';

import {PropsSplashScreen} from './interfaces';

import Logo from '~/components/common/Logo';

import styles from './SplashScreen.module.scss';
import clsx from 'clsx';
import {RootState} from '~/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {getItemStorage, setItemStorage} from '~/common/func/localStorage';
import {setCookie} from 'cookies-next';
import {KEY_STORE} from '~/constants/configs';
import {setStateLogin, setToken} from '~/redux/reducer/auth';
import {setInfoUser} from '~/redux/reducer/user';
import {setLoading} from '~/redux/reducer/site';

function SplashScreen({}: PropsSplashScreen) {
	const dispatch = useDispatch();
	const {loading} = useSelector((state: RootState) => state.site);

	const {token, isLogin} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	// Lấy data ===> local storage + cookie
	useEffect(() => {
		(async () => {
			const state = await getItemStorage(KEY_STORE);

			if (!!state) {
				setCookie(KEY_STORE, state);
				dispatch(setToken(state.token));
				dispatch(setStateLogin(state.isLogin));
				dispatch(setInfoUser(state.infoUser));
			}

			dispatch(setLoading(false));
		})();
	}, [dispatch]);

	// Set data ===> local storage + cookie
	useEffect(() => {
		if (!loading) {
			setItemStorage(KEY_STORE, {
				token: token,
				isLogin: isLogin,
				infoUser: infoUser,
			});
			setCookie(KEY_STORE, {
				token: token,
				isLogin: isLogin,
				infoUser: infoUser,
			});
		}
	}, [token, isLogin, infoUser]);

	return (
		<Fragment>
			<div className={clsx(styles.container, {[styles.close]: !loading})}>
				<Logo className={styles.logo} />
			</div>
		</Fragment>
	);
}

export default SplashScreen;
