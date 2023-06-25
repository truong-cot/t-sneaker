import React from 'react';

import styles from './ListMenu.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {Logout} from 'iconsax-react';
import {PropsListMenu} from './interfaces';
import {listMenuAvatar} from '~/constants/mocks/data';

function ListMenu({onClose}: PropsListMenu) {
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

	return (
		<div className={styles.container}>
			<div className={styles.mainMenu}>
				{listMenuAvatar.map((v, i) => (
					<Link
						key={i}
						href={v.href}
						onClick={onClose}
						className={clsx(styles.itemMenu, {
							[styles.active]:
								v.href.split('/')[1] ==
								router.pathname.split('/')[1],
						})}
					>
						<div className={styles.iconItem}>
							<v.icon size={24} />
						</div>
						<p className={styles.name}>{v.name}</p>
					</Link>
				))}
			</div>
			<div className={styles.btnLogout}>
				<div className={styles.btn}>
					<div className={styles.icon}>
						<Logout />
					</div>
					<p>Đăng xuất</p>
				</div>
			</div>
		</div>
	);
}

export default ListMenu;
