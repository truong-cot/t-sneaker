import React from 'react';

import {PropsMoneyShip} from './interfaces';
import styles from './MoneyShip.module.scss';
import clsx from 'clsx';

function MoneyShip({}: PropsMoneyShip) {
	return (
		<div>
			<div className={styles.head}>
				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]: true,
							})}
						>
							1
						</div>
						<div className={clsx({[styles.active]: true})}>
							<p className={styles.text_1}>
								Miễn phí vận chuyển 15.000 đ
							</p>
							<p className={styles.text_2}>
								Đơn hàng 500k - 1.5tr
							</p>
						</div>
					</div>
				</div>

				<div
					className={clsx(styles.line, {[styles.line_active]: true})}
				></div>

				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]: true,
							})}
						>
							2
						</div>
						<div className={clsx({[styles.active]: true})}>
							<p className={styles.text_1}>
								Miễn phí vận chuyển 30.000 đ
							</p>
							<p className={styles.text_2}>
								Đơn hàng 1.5tr - 3tr
							</p>
						</div>
					</div>
				</div>

				<div
					className={clsx(styles.line, {[styles.line_active]: false})}
				></div>

				<div className={styles.item}>
					<div className={styles.top}>
						<div
							className={clsx(styles.number, {
								[styles.active]: false,
							})}
						>
							3
						</div>
						<div className={clsx({[styles.active]: false})}>
							<p className={styles.text_1}>Miễn phí vận chuyển</p>
							<p className={styles.text_2}>Đơn hàng từ 3tr</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MoneyShip;
