import React, {useCallback, useState} from 'react';

import styles from './ListMenu.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {Logout, LogoutCurve} from 'iconsax-react';
import {PropsListMenu} from './interfaces';
import {listMenuProfile} from '~/constants/mocks/data';

function ListMenu({onClose}: PropsListMenu) {
	// STATE
	const [showPopupSignOut, setShowPopupSignOut] = useState<boolean>(false);

	const router = useRouter();
	// Xử lý đăng xuất
	// const handlerLogout = async () => {
	// 	setShowPopupSignOut(false);

	// 	httpRequest({
	// 		setLoading: setIsLoading,
	// 		http: accountService.logout({token: token!}),
	// 	}).then(() => {
	// 		dispatch(setStateLogin(false));
	// 		dispatch(setInfoUser(null));
	// 		dispatch(setAccountId(null));
	// 		dispatch(setToken(null));
	// 		router.replace('/', undefined, {scroll: false});
	// 	});
	// };

	const checkActive = useCallback(
		(pathname: string) => {
			const currentRoute = router.pathname;
			return pathname == `${currentRoute}`;
		},
		[router]
	);

	return (
		<div className={styles.container}>
			{listMenuProfile.map((v, i) => (
				<Link
					href={v.href}
					key={i}
					className={clsx(styles.item, {
						[styles.active]: checkActive(v.href),
					})}
					onClick={onClose}
				>
					<div className={styles.icon}>
						<v.icon size={20} color='#4D5A66' />
					</div>
					<p className={styles.text}>{v.title}</p>
				</Link>
			))}
			<div
				className={styles.item}
				onClick={() => {
					setShowPopupSignOut(true);
					onClose();
				}}
			>
				<div className={styles.icon}>
					<LogoutCurve size={20} color='#4D5A66' />
				</div>
				<p className={styles.text}>Đăng xuất</p>
			</div>
		</div>
	);
}

export default ListMenu;
