import React from 'react';
import {PropsMainShop} from './interfaces';

import styles from './MainShop.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import SidebarShop from '../SidebarShop';

function MainShop({}: PropsMainShop) {
	return (
		<div className={styles.container}>
			<Breadcrumb titles={['Trang chủ', 'Cửa hàng']} listHref={['/']} />
			<div className={styles.main}>
				<SidebarShop />
				<div>content</div>
			</div>
		</div>
	);
}

export default MainShop;
