import React, {useContext, useState} from 'react';
import {PropsListAddressUser} from './interfaces';
import styles from './ListAddressUser.module.scss';
import clsx from 'clsx';
import Popup from '~/components/common/Popup';
import PopupAddAddress from '~/components/popups/PopupAddAddress';
import {ContextPayment, TypeContextPayment} from '../context';

function ListAddressUser({listAddress, onCLoseListAddress}: PropsListAddressUser) {
	const context = useContext<TypeContextPayment>(ContextPayment);

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
					{listAddress?.map((v) => (
						<div
							key={v?._id}
							className={clsx(styles.item, {[styles.active]: context?.addressUser?._id == v?._id})}
							onClick={() => {
								onCLoseListAddress();
								context?.setAddressUser(v);
							}}
						>
							<div className={styles.top}>
								<h5 className={styles.name}>{v?.nameReceiver}</h5>
								<div className={styles.line}></div>
								<h6 className={styles.phone}>{v?.phoneReceiver}</h6>
							</div>
							<div className={styles.bottom}>
								<p className={styles.address}>
									<span style={{fontWeight: '400', marginRight: '4px'}}>Địa chỉ: </span>
									{v?.address}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<Popup open={openPopup} onClose={() => setOpenPopup(false)}>
				<PopupAddAddress onClose={() => setOpenPopup(false)} />
			</Popup>
		</>
	);
}

export default ListAddressUser;
