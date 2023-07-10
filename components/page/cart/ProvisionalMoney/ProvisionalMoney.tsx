import React from 'react';

import styles from './ProvisionalMoney.module.scss';
import {PropsProvisionalMoney} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';

function ProvisionalMoney({}: PropsProvisionalMoney) {
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Tổng tiền tạm tính</h4>
			<div className={styles.item}>
				<p className={styles.text_1}>Thành tiền: </p>
				<p className={styles.text_2}>{convertCoin(1500000)}đ</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Phí vận chuyển: </p>
				<p className={styles.text_2}>
					<span>-</span>
					{'  '}
					{convertCoin(30000)}đ
				</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Tổng tạm tính: </p>
				<p className={styles.text_3}>{convertCoin(2500000)}đ</p>
			</div>
			<div className={styles.btn}>
				<Button purple bold>
					Thanh toán
				</Button>
			</div>
		</div>
	);
}

export default ProvisionalMoney;
