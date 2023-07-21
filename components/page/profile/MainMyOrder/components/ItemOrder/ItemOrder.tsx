import React from 'react';

import styles from './ItemOrder.module.scss';
import {TypeProductOrder} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';

function ItemOrder({}: TypeProductOrder) {
	return (
		<div className={styles.container}>
			<div className={styles.main}></div>
			<div className={styles.line}></div>
			<div className={styles.bottom}>
				<h4 className={styles.total_price}>
					Tổng tiền: <span>{convertCoin(12400000)}đ</span>
				</h4>
				<div>
					<Button w_fit unbg>
						Hủy đơn hàng
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ItemOrder;
