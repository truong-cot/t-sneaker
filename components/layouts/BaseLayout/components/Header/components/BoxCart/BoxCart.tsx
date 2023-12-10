import React, {useMemo} from 'react';
import {IoCloseSharp} from 'react-icons/io5';
import {FaCartArrowDown} from 'react-icons/fa';

import {PropsBoxCart} from './interfaces';
import styles from './BoxCart.module.scss';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import ItemCart from '../ItemCart';

function BoxCart({listCart, onClose}: PropsBoxCart) {
	const totalPrice = useMemo(() => {
		const total = listCart.reduce((accumulator, v) => {
			const priceSale = (v?.productId?.price * v?.productId?.sale) / 100;

			const price = (v?.productId?.price - priceSale) * v?.quality;

			return accumulator + price;
		}, 0);

		return total;
	}, [listCart]);

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.head}>
					<div className={styles.box_title}>
						<div className={styles.icon_title}>
							<FaCartArrowDown color='#2A85FF' size={20} />
						</div>
						<h4 className={styles.title}>
							Giỏ hàng của bạn <span className={styles.quantity}>({listCart?.length})</span>
						</h4>
					</div>
					<div className={styles.close} onClick={onClose}>
						<IoCloseSharp size={28} />
					</div>
				</div>
				<div className={styles.list}>
					{listCart?.map((v) => (
						<ItemCart data={v} key={v?._id} />
					))}
				</div>
			</div>
			<div className={styles.bottom}>
				<h4 className={styles.total_price}>
					Tổng tiền giỏ hàng: <span className={styles.price}>{convertCoin(totalPrice)}đ</span>
				</h4>
				<Button href='/cart' secondary bold>
					Đến chi tiết giỏ hàng
				</Button>
			</div>
		</div>
	);
}

export default BoxCart;
