import React from 'react';

import styles from './AddressDelivery.module.scss';
import {PropsAddressDelivery} from './interfaces';

function AddressDelivery({}: PropsAddressDelivery) {
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h4 className={styles.title}>Thông tin người nhận hàng</h4>
				<p className={styles.change}>Đổi địa chỉ</p>
			</div>
			<div className={styles.content}>
				<div className={styles.top}>
					<h5 className={styles.name}>Đặng Bá Trường</h5>
					<div className={styles.line}></div>
					<h6 className={styles.phone}>0123456789</h6>
				</div>
				<div className={styles.bottom}>
					<div className={styles.category}>
						<p className={styles.text}>Nhà riêng</p>
					</div>
					<p className={styles.address}>
						Thôn Khánh Sơn, Xã Sơn Lộc, Huyện Can Lộc, Tỉnh Hà Tĩnh
					</p>
				</div>
			</div>
		</div>
	);
}

export default AddressDelivery;
