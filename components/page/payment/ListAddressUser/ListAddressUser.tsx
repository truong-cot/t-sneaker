import React, {useState} from 'react';
import {PropsListAddressUser} from './interfaces';
import styles from './ListAddressUser.module.scss';
import clsx from 'clsx';
import Popup from '~/components/common/Popup';
import PopupAddAddress from '~/components/popups/PopupAddAddress';

function ListAddressUser({onCLoseListAddress}: PropsListAddressUser) {
	const [openPopup, setOpenPopup] = useState<boolean>(false);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.head}>
					<h5 className={styles.title}>Địa chỉ nhận hàng</h5>
					<p
						className={styles.add}
						onClick={() => {
							onCLoseListAddress();
							setOpenPopup(true);
						}}
					>
						Thêm địa chỉ mới
					</p>
				</div>
				<div className={styles.list}>
					<div className={clsx(styles.item, {[styles.active]: true})} onClick={onCLoseListAddress}>
						<div className={styles.top}>
							<h5 className={styles.name}>Đặng Bá Trường</h5>
							<div className={styles.line}></div>
							<h6 className={styles.phone}>0123456789</h6>
						</div>
						<div className={styles.bottom}>
							<div className={styles.category}>
								<p className={styles.text}>Nhà riêng</p>
							</div>
							<p className={styles.address}>Thôn Khánh Sơn, Xã Sơn Lộc, Huyện Can Lộc, Tỉnh Hà Tĩnh</p>
						</div>
					</div>
					<div className={styles.item} onClick={onCLoseListAddress}>
						<div className={styles.top}>
							<h5 className={styles.name}>Đặng Bá Trường</h5>
							<div className={styles.line}></div>
							<h6 className={styles.phone}>0123456789</h6>
						</div>
						<div className={styles.bottom}>
							<div className={styles.category}>
								<p className={styles.text}>Nhà riêng</p>
							</div>
							<p className={styles.address}>Thôn Khánh Sơn, Xã Sơn Lộc, Huyện Can Lộc, Tỉnh Hà Tĩnh</p>
						</div>
					</div>
				</div>
			</div>

			<Popup open={openPopup} onClose={() => setOpenPopup(false)}>
				<PopupAddAddress onClose={() => setOpenPopup(false)} />
			</Popup>
		</>
	);
}

export default ListAddressUser;
