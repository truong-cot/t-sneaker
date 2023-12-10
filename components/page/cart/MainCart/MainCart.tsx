import React, {useEffect, useMemo, useState} from 'react';

import styles from './MainCart.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import ProvisionalMoney from '../ProvisionalMoney';
import MainListCart from '../MainListCart';
import {ContextCart} from '../context';
import {ICart} from '../MainListCart/interfaces';

function MainCart() {
	const [listCart, setListCart] = useState<ICart[]>([]);
	const [discount, setDiscount] = useState<number>(0);

	// Tính tổng giá trị đơn hàng được chọn
	const totalPriceCart = useMemo(() => {
		const total = listCart.reduce((accumulator, v) => {
			const priceSale = (v?.productId?.price * v?.productId?.sale) / 100;

			const price = (v?.productId?.price - priceSale) * v?.quality;

			return accumulator + price;
		}, 0);

		return total;
	}, [listCart]);

	return (
		<div className={styles.container}>
			<Breadcrumb titles={['Trang chủ', 'Giỏ hàng của bạn']} listHref={['/']} />
			<ContextCart.Provider value={{listCart, setListCart, totalPriceCart, discount, setDiscount}}>
				<div className={styles.wrapper}>
					<MainListCart />
					<ProvisionalMoney />
				</div>
			</ContextCart.Provider>
		</div>
	);
}

export default MainCart;
