import React, {useContext, useMemo} from 'react';

import {PropsMoneyShip} from './interfaces';
import styles from './MoneyShip.module.scss';
import clsx from 'clsx';
import {ContextCart, TypeContext} from '../context';
import {MONEY_CART, DISCOUNT_MONEY} from '~/constants/mocks/enum';
import {convertCoin} from '~/common/func/convertCoin';

function MoneyShip({}: PropsMoneyShip) {
	// Gọi context
	const context = useContext<TypeContext>(ContextCart);

	useMemo(() => {
		if (context.totalPriceCart == 0) {
			return context?.setDiscount(0);
		}

		if (context.totalPriceCart > MONEY_CART.MONEY_50 && context.totalPriceCart < MONEY_CART.MONEY_150) {
			return context?.setDiscount(DISCOUNT_MONEY.DISCOUNT_01);
		}

		if (context.totalPriceCart >= MONEY_CART.MONEY_150 && context.totalPriceCart < MONEY_CART.MONEY_300) {
			return context?.setDiscount(DISCOUNT_MONEY.DISCOUNT_02);
		}

		if (context.totalPriceCart >= MONEY_CART.MONEY_300) {
			return context?.setDiscount(DISCOUNT_MONEY.DISCOUNT_03);
		}

		return context?.setDiscount(0);
	}, [context?.totalPriceCart]);

	return (
		<div>
			<div className={styles.head}>
				{/* FREE_15 */}
				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]: context?.discount == DISCOUNT_MONEY.DISCOUNT_01,
							})}
						>
							1
						</div>
						<div
							className={clsx({
								[styles.active]: context?.discount == DISCOUNT_MONEY.DISCOUNT_01,
							})}
						>
							<p className={styles.text_1}>Giảm {convertCoin(DISCOUNT_MONEY.DISCOUNT_01)} đ</p>
							<p className={styles.text_2}>
								Đơn hàng {convertCoin(MONEY_CART.MONEY_50)}đ - {convertCoin(MONEY_CART.MONEY_150)}đ
							</p>
						</div>
					</div>
				</div>

				{/* FREE_30 */}
				<div className={clsx(styles.line)}></div>

				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]: context?.discount == DISCOUNT_MONEY.DISCOUNT_02,
							})}
						>
							2
						</div>
						<div
							className={clsx({
								[styles.active]: context?.discount == DISCOUNT_MONEY.DISCOUNT_02,
							})}
						>
							<p className={styles.text_1}>Giảm {convertCoin(DISCOUNT_MONEY.DISCOUNT_02)} đ</p>
							<p className={styles.text_2}>
								Đơn hàng {convertCoin(MONEY_CART.MONEY_150)}đ - {convertCoin(MONEY_CART.MONEY_300)}đ
							</p>
						</div>
					</div>
				</div>

				{/* DISCOUNT 50 */}
				<div className={clsx(styles.line)}></div>
				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]: context?.discount == DISCOUNT_MONEY.DISCOUNT_03,
							})}
						>
							3
						</div>
						<div
							className={clsx({
								[styles.active]: context?.discount == DISCOUNT_MONEY.DISCOUNT_03,
							})}
						>
							<p className={styles.text_1}>Giảm {convertCoin(DISCOUNT_MONEY.DISCOUNT_03)} đ</p>
							<p className={styles.text_2}>Đơn hàng từ {convertCoin(MONEY_CART.MONEY_300)}đ</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MoneyShip;
