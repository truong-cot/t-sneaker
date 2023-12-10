import React, {useContext, useEffect, useState} from 'react';

import styles from './AddressDelivery.module.scss';
import {PropsAddressDelivery} from './interfaces';
import clsx from 'clsx';
import ListAddressUser from '../ListAddressUser';
import {ContextPayment, TypeContextPayment} from '../context';

function AddressDelivery({listAddress, infoReceiver, setInfoReceiver}: PropsAddressDelivery) {
	const context = useContext<TypeContextPayment>(ContextPayment);

	const [openListAddress, setOpenListAddress] = useState<boolean>(false);

	useEffect(() => {
		const item = listAddress?.find((v) => v.isDefault == true);

		if (item) {
			context?.setAddressUser(item);
			setInfoReceiver((prev: any) => ({
				...prev,
				name: item?.nameReceiver,
				phone: item?.phoneReceiver,
			}));
		} else {
			context?.setAddressUser(listAddress?.[0]);
			setInfoReceiver((prev: any) => ({
				...prev,
				name: listAddress?.[0].nameReceiver,
				phone: listAddress?.[0].phoneReceiver,
			}));
		}
	}, [listAddress]);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h4 className={styles.title}>Thông tin người nhận hàng</h4>
				<p className={styles.change} onClick={() => setOpenListAddress(true)}>
					Đổi địa chỉ
				</p>
				<div
					className={clsx(styles.list_address, {
						[styles.open]: openListAddress,
					})}
				>
					<ListAddressUser listAddress={listAddress} onCLoseListAddress={() => setOpenListAddress(false)} />
				</div>
				{openListAddress && <div className={'overlay'} onClick={() => setOpenListAddress(false)}></div>}
			</div>
			<div className={styles.content}>
				<div className={styles.top}>
					<h5 className={styles.name}>{infoReceiver?.name}</h5>
					<div className={styles.line}></div>
					<h6 className={styles.phone}>{infoReceiver?.phone}</h6>
				</div>
				<div className={styles.bottom}>
					<p className={styles.address}>{context?.addressUser?.address}</p>
				</div>
			</div>
			<div className={styles.note}>
				<p className={styles.lable}>
					Ghi chú đơn hàng: <span style={{color: 'red'}}>*</span>
				</p>
				<input
					type='text'
					placeholder='Nhập ghi chú đơn hàng'
					className={styles.input}
					value={infoReceiver?.note}
					onChange={(e) =>
						setInfoReceiver((prev: any) => ({
							...prev,
							note: e.target.value,
						}))
					}
				/>
			</div>
		</div>
	);
}

export default AddressDelivery;
