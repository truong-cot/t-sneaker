import React from 'react';
import {IoCloseSharp} from 'react-icons/io5';
import {FaCartArrowDown} from 'react-icons/fa';

import {PropsBoxCart} from './interfaces';
import styles from './BoxCart.module.scss';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import ItemCart from '../ItemCart';

function BoxCart({onClose}: PropsBoxCart) {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.head}>
					<div className={styles.box_title}>
						<div className={styles.icon_title}>
							<FaCartArrowDown color='#2A85FF' size={20} />
						</div>
						<h4 className={styles.title}>
							Giỏ hàng của bạn{' '}
							<span className={styles.quantity}>(4)</span>
						</h4>
					</div>
					<div className={styles.close} onClick={onClose}>
						<IoCloseSharp size={28} />
					</div>
				</div>
				<div className={styles.list}>
					<ItemCart />
					<ItemCart />
					<ItemCart />
					<ItemCart />
					<ItemCart />
				</div>
			</div>
			<div className={styles.bottom}>
				<h4 className={styles.total_price}>
					Tổng tiền giỏ hàng:{' '}
					<span className={styles.price}>
						{convertCoin(200000000)}đ
					</span>
				</h4>
				<Button secondary bold>
					Đến chi tiết giỏ hàng
				</Button>
			</div>
		</div>
	);
}

export default BoxCart;
