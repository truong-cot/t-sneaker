import React, {Fragment, useCallback, useState} from 'react';
import {PropsSideBarProfile} from './interfaces';

import styles from './SideBarProfile.module.scss';
import Avatar from '~/components/common/Avatar/Avatar';
import {AiOutlineDoubleRight} from 'react-icons/ai';
import Link from 'next/link';
import clsx from 'clsx';
import {listMenuSidebarProfile} from '~/constants/mocks/data';
import {useRouter} from 'next/router';
import {LogoutCurve} from 'iconsax-react';
import Dialog from '~/components/controls/Dialog/Dialog';

function SideBarProfile({}: PropsSideBarProfile) {
	const router = useRouter();
	const [showLogout, setShowLogout] = useState<boolean>(false);

	const checkActive = useCallback(
		(pathname: string) => {
			const currentRoute = router.pathname;
			return pathname == `${currentRoute}`;
		},
		[router]
	);

	const handleLogout = () => {};

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.box_info}>
					<div className={styles.left}>
						<div className={styles.box_avatar}>
							<Avatar className={styles.avatar} />
						</div>
						<div className={styles.right}>
							<p className={styles.name}>Đặng Bá Trường</p>
							<p className={styles.info}>
								Nam <span>16/09/2000</span>
							</p>
						</div>
					</div>
					<div className={styles.icon_arrow}>
						<AiOutlineDoubleRight size={24} color='#46bef2' />
					</div>
				</div>
				<div className={styles.line}></div>
				<div className={styles.main}>
					{listMenuSidebarProfile.map((v, i) => (
						<Link
							key={i}
							href={v.link}
							className={clsx(styles.item, {[styles.active]: checkActive(v.link)})}
						>
							<div className={styles.box_icon}>
								<v.icon className={styles.icon} />
							</div>
							<p className={styles.text}>{v.name}</p>
						</Link>
					))}

					<div className={clsx(styles.item)} onClick={() => setShowLogout(true)}>
						<div className={styles.box_icon}>
							<LogoutCurve className={styles.icon} />
						</div>
						<p className={styles.text}>Đăng xuất</p>
					</div>
				</div>
			</div>

			<Dialog
				open={showLogout}
				onClose={() => setShowLogout(false)}
				onSubmit={handleLogout}
				title='Đăng xuất khỏi hệ thống!'
				note='Bạn có chắc chắn muốn đăng xuất khỏi hệ thống!'
			/>
		</Fragment>
	);
}

export default SideBarProfile;
