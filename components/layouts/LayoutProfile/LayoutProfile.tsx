import React from 'react';
import LayoutGrid from '../LayoutGrid';
import styles from './LayoutProfile.module.scss';
import {PropsLayoutProfile} from './interfaces';
import SideBarProfile from './components/SideBarProfile';

function LayoutProfile({children}: PropsLayoutProfile) {
	return (
		<div className={styles.container}>
			<LayoutGrid>
				<div className={styles.main}>
					<div className={styles.sidebar}>
						<SideBarProfile />
					</div>
					<div className={styles.layoutMain}>
						<div className={styles.bg}>{children}</div>
					</div>
				</div>
			</LayoutGrid>
		</div>
	);
}

export default LayoutProfile;
