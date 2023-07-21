import React, {useState} from 'react';
import {Add} from 'iconsax-react';
import {HiOutlineCheckCircle} from 'react-icons/hi';

import styles from './MainListAddress.module.scss';
import {PropsMainListAddress} from './interfaces';
import Popup from '~/components/common/Popup';
import PopupAddAddress from '~/components/popups/PopupAddAddress/PopupAddAddress';
import Dialog from '~/components/controls/Dialog/Dialog';
import PopupUpdateAddress from '~/components/popups/PopupUpdateAddress/PopupUpdateAddress';

function MainListAddress({}: PropsMainListAddress) {
	const [open, setOpen] = useState<boolean>(false);
	const [openUpdate, setOpenUpdate] = useState<boolean>(false);
	const [openDelete, setOpenDelete] = useState<boolean>(false);

	const handleDeleteAddress = () => {};

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
					<div className={styles.item}>
						<div className={styles.top}>
							<div className={styles.info}>
								<p className={styles.name}>Đặng Bá Trường</p>
								<div className={styles.line}></div>
								<div className={styles.default}>
									<div className={styles.icon_add}>
										<HiOutlineCheckCircle color='#26bc4e' />
									</div>
									<p className={styles.text_default}>Địa chỉ mặc định</p>
								</div>
							</div>
							<div className={styles.control}>
								<p className={styles.delete} onClick={() => setOpenDelete(true)}>
									Xóa
								</p>
								<p className={styles.update} onClick={() => setOpenUpdate(true)}>
									Chỉnh sửa
								</p>
							</div>
						</div>
						<p className={styles.key}>
							Loại địa chỉ: <span>Nhà riêng</span>
						</p>
						<p className={styles.key}>
							Số điện thoại: <span>0339940200</span>
						</p>
						<p className={styles.key}>
							Địa chỉ: <span>Can Lộc, Xã Bình Chánh, Huyện Châu Phú, Tỉnh An Giang</span>
						</p>
					</div>
					<div className={styles.item}>
						<div className={styles.top}>
							<div className={styles.info}>
								<p className={styles.name}>Đặng Bá Trường</p>
								<div className={styles.line}></div>
								<div className={styles.default}>
									<div className={styles.icon_add}>
										<HiOutlineCheckCircle color='#26bc4e' />
									</div>
									<p className={styles.text_default}>Địa chỉ mặc định</p>
								</div>
							</div>
							<div className={styles.control}>
								<p className={styles.delete} onClick={() => setOpenDelete(true)}>
									Xóa
								</p>
								<p className={styles.update} onClick={() => setOpenUpdate(true)}>
									Chỉnh sửa
								</p>
							</div>
						</div>
						<p className={styles.key}>
							Loại địa chỉ: <span>Nhà riêng</span>
						</p>
						<p className={styles.key}>
							Số điện thoại: <span>0339940200</span>
						</p>
						<p className={styles.key}>
							Địa chỉ: <span>Can Lộc, Xã Bình Chánh, Huyện Châu Phú, Tỉnh An Giang</span>
						</p>
					</div>
				</div>
			</div>

			{/* Popup add */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupAddAddress onClose={() => setOpen(false)} />
			</Popup>

			{/* Popup update */}
			<Popup open={openUpdate} onClose={() => setOpenUpdate(false)}>
				<PopupUpdateAddress onClose={() => setOpenUpdate(false)} />
			</Popup>

			{/* Dialog */}
			<Dialog
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				onSubmit={handleDeleteAddress}
				title='Xóa địa chỉ'
				note='Bạn có chắc chắn muốn xóa địa chỉ giao hàng này?'
			/>
		</>
	);
}

export default MainListAddress;
