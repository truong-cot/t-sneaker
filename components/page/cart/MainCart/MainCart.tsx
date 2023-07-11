import React, {useEffect, useMemo, useState} from 'react';

import styles from './MainCart.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import ProvisionalMoney from '../ProvisionalMoney';
import MainListCart from '../MainListCart';
import {ContextCart} from '../context';
import {TypeCart} from '~/constants/mocks/data';

function MainCart() {
	const [listCart, setListCart] = useState<TypeCart[]>([]);

	// Tính tổng giá trị đơn hàng được chọn
	const totalPriceChosseCart = useMemo(() => {
		let total = 0;

		listCart.forEach((v) => {
			// Tính giá theo giá gốc và khuyến mãi
			let priceSale = v.unitPrice - v.unitPrice * (v.sale / 100);

			// Tính thành tiền theo giá đã khuyến mãi và số lượng
			let totalPrice = priceSale * v.qlt;

			// Tính tổng
			total += totalPrice;
		});

		return total;
	}, [listCart]);

	return (
		<div className={styles.container}>
			<Breadcrumb
				titles={['Trang chủ', 'Giỏ hàng của bạn']}
				listHref={['/']}
			/>
			<ContextCart.Provider
				value={{listCart, setListCart, totalPriceChosseCart}}
			>
				<div className={styles.wrapper}>
					<MainListCart />
					<ProvisionalMoney />
				</div>
			</ContextCart.Provider>
		</div>
	);
}

export default MainCart;
