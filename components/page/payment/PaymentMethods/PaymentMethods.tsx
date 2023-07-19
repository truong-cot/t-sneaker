import React, {useContext} from 'react';
import styles from './PaymentMethods.module.scss';
import {PropsPaymentMethods} from './interfaces';
import {ContextPayment} from '../context';

function PaymentMethods({}: PropsPaymentMethods) {
	const context = useContext<any>(ContextPayment);

	const {data} = context;

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Hình thức thanh toán</h4>
			<div className={styles.main}>
				<div className={styles.item}>
					<input
						className={styles.radio}
						type='radio'
						id='method_1'
						name='payment_method'
						value='1'
						defaultChecked
					/>
					<label className={styles.label} htmlFor='method_1'>
						Giao hàng tiết kiệm
					</label>
				</div>
				<div className={styles.item}>
					<input
						className={styles.radio}
						type='radio'
						id='method_2'
						name='payment_method'
						value='2'
					/>
					<label className={styles.label} htmlFor='method_2'>
						Giao hàng nhanh
					</label>
				</div>
				<div className={styles.item}>
					<input
						className={styles.radio}
						type='radio'
						id='method_3'
						name='payment_method'
						value='3'
					/>
					<label className={styles.label} htmlFor='method_3'>
						Giao hàng siêu tốc
					</label>
				</div>
			</div>
		</div>
	);
}

export default PaymentMethods;
