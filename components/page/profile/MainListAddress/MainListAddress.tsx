import React, {useEffect, useState} from 'react';
import {Add} from 'iconsax-react';
import {HiOutlineCheckCircle} from 'react-icons/hi';

import styles from './MainListAddress.module.scss';
import {IAddress, PropsMainListAddress} from './interfaces';
import Popup from '~/components/common/Popup';
import PopupAddAddress from '~/components/popups/PopupAddAddress/PopupAddAddress';
import Dialog from '~/components/controls/Dialog/Dialog';
import {httpRequest} from '~/services';
import addressServices from '~/services/addressServices';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import icons from '~/constants/images/icons';
import {toastWarn} from '~/common/func/toast';

function MainListAddress({}: PropsMainListAddress) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [id, setId] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [openDefault, setOpenDefault] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(false);

	const [data, setData] = useState<IAddress[]>([]);

	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: addressServices.getAddress({
				token: token!,
				userId: infoUser?._id!,
			}),
		}).then((data) => {
			if (data) {
				setData(data);
			}
		});
	}, [token, infoUser?._id, router]);

	const handleDeleteAddress = () => {
		if (!id) {
			return toastWarn({msg: 'Không tìm thấy địa chỉ!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: addressServices.deleteAddress({
				token: token!,
				idAddress: id,
			}),
		}).then((data) => {
			if (data) {
				setId('');
				setOpenDelete(false);
				router.replace(router.pathname, undefined, {scroll: false, shallow: false});
			}
		});
	};

	const handleSetDefault = () => {
		if (!id) {
			return toastWarn({msg: 'Không tìm thấy địa chỉ!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: addressServices.setDefaultAddress({
				token: token!,
				idAddress: id,
			}),
		}).then((data) => {
			if (data) {
				setId('');
				setOpenDefault(false);
				router.replace(router.pathname, undefined, {scroll: false, shallow: false});
			}
		});
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.add} onClick={() => setOpen(true)}>
					<div className={styles.icon_add}>
						<Add size={24} />
					</div>
					<p className={styles.text_add}>Thêm địa chỉ mới</p>
				</div>

				<div className={styles.main}>
					<DataWrapper
						data={data}
						loading={loading}
						noti={
							<Noti
								disableButton
								title='Địa chỉ trống!'
								des='Hiện tại chưa có địa chỉ giao hàng nào!'
								img={icons.NoItemsCart_removebg}
							/>
						}
					>
						{data?.map((v) => (
							<div key={v._id} className={styles.item}>
								<div className={styles.top}>
									<div className={styles.info}>
										<p className={styles.name}>{v?.nameReceiver}</p>
										{v?.isDefault ? (
											<>
												<div className={styles.line}></div>
												<div className={styles.default}>
													<div className={styles.icon_add}>
														<HiOutlineCheckCircle color='#26bc4e' />
													</div>
													<p className={styles.text_default}>Địa chỉ mặc định</p>
												</div>
											</>
										) : null}
									</div>
									<div className={styles.control}>
										<p
											className={styles.delete}
											onClick={() => {
												setOpenDelete(true);
												setId(v?._id);
											}}
										>
											Xóa
										</p>
										{!v?.isDefault && (
											<p
												className={styles.default}
												onClick={() => {
													setOpenDefault(true);
													setId(v?._id);
												}}
											>
												Đặt mặc định
											</p>
										)}
									</div>
								</div>
								<p className={styles.key}>
									Số điện thoại: <span>{v?.phoneReceiver}</span>
								</p>
								<p className={styles.key}>
									Địa chỉ: <span>{v?.address}</span>
								</p>
							</div>
						))}
					</DataWrapper>
				</div>
			</div>

			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupAddAddress onClose={() => setOpen(false)} />
			</Popup>

			<Dialog
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				onSubmit={handleDeleteAddress}
				title='Xóa địa chỉ'
				note='Bạn có chắc chắn muốn xóa địa chỉ giao hàng này?'
			/>
			<Dialog
				open={openDefault}
				onClose={() => setOpenDefault(false)}
				onSubmit={handleSetDefault}
				title='Đặt mặc định'
				note='Bạn có chắc chắn muốn đặt địa chỉ làm mặc định không?'
			/>
		</>
	);
}

export default MainListAddress;
