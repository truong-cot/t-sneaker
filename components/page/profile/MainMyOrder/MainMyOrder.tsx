import React from 'react';

import styles from './MainMyOrder.module.scss';
import {PropsMainMyOrder} from './interfaces';
import TabNavLinkActive from '~/components/controls/TabNavLinkActive';
import ItemOrder from './components/ItemOrder';

function MainMyOrder({}: PropsMainMyOrder) {
	const listTab: Array<any> = [
		{
			title: 'Đang xử lý',
			query: null,
			pathname: '/profile/my-order',
		},
		{
			title: 'Đang giao',
			query: 'delivering',
			pathname: '/profile/my-order',
		},
		{
			title: 'Đã hoàn thành',
			query: 'accomplished',
			pathname: '/profile/my-order',
		},
		{
			title: 'Đã hủy',
			query: 'cancelled',
			pathname: '/profile/my-order',
		},
	];

	return (
		<div className={styles.container}>
			<TabNavLinkActive listHref={listTab} query='_status' />
			<div className={styles.main}>
				<ItemOrder />
				<ItemOrder />
			</div>
		</div>
	);
}

export default MainMyOrder;
