import React, {useContext} from 'react';

import {PropsMoneyShip} from './interfaces';
import styles from './MoneyShip.module.scss';
import clsx from 'clsx';
import {ContextCart, TypeContext} from '../context';
import {MONEY, PRICE_SHIPPING} from '~/constants/mocks/enum';
import {convertCoin} from '~/common/func/convertCoin';

function MoneyShip({}: PropsMoneyShip) {
	// Gọi context
	const context = useContext<TypeContext>(ContextCart);

	return (
		<div>
			<div className={styles.head}>
				{/* FREE_15 */}
				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]:
									context.totalPriceChosseCart >
										MONEY.FREE_00 &&
									context.totalPriceChosseCart <
										MONEY.FREE_15,
							})}
						>
							1
						</div>
						<div
							className={clsx({
								[styles.active]:
									context.totalPriceChosseCart >
										MONEY.FREE_00 &&
									context.totalPriceChosseCart <
										MONEY.FREE_15,
							})}
						>
							<p className={styles.text_1}>
								Miễn phí vận chuyển{' '}
								{convertCoin(PRICE_SHIPPING.SHIPPING_01)} đ
							</p>
							<p className={styles.text_2}>
								Đơn hàng {convertCoin(MONEY.FREE_00)}đ -{' '}
								{convertCoin(MONEY.FREE_15)}đ
							</p>
						</div>
					</div>
				</div>

				{/* FREE_25 */}
				<div className={clsx(styles.line)}></div>

				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]:
									context.totalPriceChosseCart >
										MONEY.FREE_15 &&
									context.totalPriceChosseCart <
										MONEY.FREE_25,
							})}
						>
							2
						</div>
						<div
							className={clsx({
								[styles.active]:
									context.totalPriceChosseCart >
										MONEY.FREE_15 &&
									context.totalPriceChosseCart <
										MONEY.FREE_25,
							})}
						>
							<p className={styles.text_1}>
								Miễn phí vận chuyển{' '}
								{convertCoin(PRICE_SHIPPING.SHIPPING_02)} đ
							</p>
							<p className={styles.text_2}>
								Đơn hàng {convertCoin(MONEY.FREE_15)}đ -{' '}
								{convertCoin(MONEY.FREE_25)}đ
							</p>
						</div>
					</div>
				</div>

				{/* FREE */}
				<div className={clsx(styles.line)}></div>

				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]:
									context.totalPriceChosseCart >
									MONEY.FREE_25,
							})}
						>
							3
						</div>
						<div
							className={clsx({
								[styles.active]:
									context.totalPriceChosseCart >
									MONEY.FREE_25,
							})}
						>
							<p className={styles.text_1}>Miễn phí vận chuyển</p>
							<p className={styles.text_2}>
								Đơn hàng từ {convertCoin(MONEY.FREE_25)}đ
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MoneyShip;
