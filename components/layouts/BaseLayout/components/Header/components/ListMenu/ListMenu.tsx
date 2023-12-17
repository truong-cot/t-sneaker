import React, {useCallback, useState} from 'react';

import styles from './ListMenu.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {LogoutCurve} from 'iconsax-react';
import {PropsListMenu} from './interfaces';
import {listMenuProfile} from '~/constants/mocks/data';
import Dialog from '~/components/controls/Dialog';
import {useDispatch} from 'react-redux';
import {setStateLogin, setToken} from '~/redux/reducer/auth';
import {setInfoUser} from '~/redux/reducer/user';

function ListMenu({onClose}: PropsListMenu) {
	const dispatch = useDispatch();
	// STATE
	const [showLogout, setShowLogout] = useState<boolean>(false);

	const router = useRouter();

	const checkActive = useCallback(
		(pathname: string) => {
			const currentRoute = router.pathname;
			return pathname == `${currentRoute}`;
		},
		[router]
	);

	const handleLogout = async () => {
		setShowLogout(false);

		dispatch(setToken(null));
		dispatch(setStateLogin(false));
		dispatch(setInfoUser(null));
	};

	return (
		<>
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
						setShowLogout(true);
						onClose();
					}}
				>
					<div className={styles.icon}>
						<LogoutCurve size={20} color='#4D5A66' />
					</div>
					<p className={styles.text}>Đăng xuất</p>
				</div>
			</div>
			<Dialog
				open={showLogout}
				onClose={() => setShowLogout(false)}
				onSubmit={handleLogout}
				title='Đăng xuất khỏi hệ thống!'
				note='Bạn có chắc chắn muốn đăng xuất khỏi hệ thống!'
			/>
		</>
	);
}

export default ListMenu;
