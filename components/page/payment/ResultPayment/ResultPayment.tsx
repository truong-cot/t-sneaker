import React, {useContext} from 'react';

import styles from './ResultPayment.module.scss';
import {PropsResultPayment} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import {ContextPayment, TypeContextPayment} from '../context';

function ResultPayment({}: PropsResultPayment) {
	// Gọi context
	const context = useContext<TypeContextPayment>(ContextPayment);

	const {data} = context;

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>ĐƠN HÀNG CỦA BẠN</h4>
			<div className={styles.list}>
				<div className={styles.item_1}>
					<p className={styles.text_4}>Sản phẩm</p>
					<p className={styles.text_4}>Số lượng</p>
				</div>
				{data?.listProduct.map((v, i) => (
					<div className={styles.item_2} key={i}>
						<p className={styles.name_product}>{`${i + 1}. ${v.name}`}</p>
						<p className={styles.price_product}>{v.qlt}</p>
					</div>
				))}
			</div>
			<div className={styles.bottom}>
				<div className={styles.item}>
					<p className={styles.text_1}>Tạm tính: </p>
					<p className={styles.text_2}>{convertCoin(1250000)}đ</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Phí vận chuyển: </p>
					<p className={styles.text_2}>{convertCoin(1250000)}đ</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Khuyến mãi vận chuyển: </p>
					<p className={styles.text_2}>
						-{'  '}
						{convertCoin(1250000)}đ
					</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Tổng thanh toán: </p>
					<p className={styles.text_3}>{convertCoin(1250000)}đ</p>
				</div>
			</div>
			<div className={styles.box_check}>
				<input className={styles.radio} type='checkbox' id='rules' name='rules' value='1' />
				<label className={styles.label} htmlFor='rules'>
					Bạn đã hiểu chỉnh sách đặt hàng của T - Sneaker
				</label>
			</div>
			<div className={styles.btn}>
				<div>
					<Button w_fit bright_red p_10_32 rounded_8 href='/payment/success'>
						Đặt hàng
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ResultPayment;
