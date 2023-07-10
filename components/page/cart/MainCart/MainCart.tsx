import React from 'react';

import styles from './MainCart.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import clsx from 'clsx';
import MoneyShip from '../MoneyShip';
import ProvisionalMoney from '../ProvisionalMoney';
import MainListCart from '../MainListCart';

function MainCart() {
	return (
		<div className={styles.container}>
			<Breadcrumb
				titles={['Trang chủ', 'Giỏ hàng của bạn']}
				listHref={['/']}
			/>
			<div className={styles.wrapper}>
				<MainListCart />
				<ProvisionalMoney />
			</div>
		</div>
	);
}

export default MainCart;
