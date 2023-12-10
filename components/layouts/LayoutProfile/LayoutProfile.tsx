import React from 'react';
import styles from './LayoutProfile.module.scss';
import {PropsLayoutProfile} from './interfaces';
import SideBarProfile from './components/SideBarProfile';
import RequireAuth from '~/components/protected/RequiredAuth';

function LayoutProfile({children, breadcrumb, title}: PropsLayoutProfile) {
	return (
		<RequireAuth>
			<div className={styles.container}>
				{/* Breadcrumb */}
				{breadcrumb}

				{/* Main */}
				<div className={styles.main}>
					<div className={styles.sidebar}>
						<SideBarProfile />
					</div>
					<div className={styles.layoutMain}>
						<div className={styles.bg}>
							<h4 className={styles.title}>{title}</h4>
							{children}
						</div>
					</div>
				</div>
			</div>
		</RequireAuth>
	);
}

export default LayoutProfile;
