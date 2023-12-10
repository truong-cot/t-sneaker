import React, {Fragment, useState} from 'react';

import styles from './ItemOrder.module.scss';
import {TypeProductOrder} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import Link from 'next/link';
import Popup from '~/components/common/Popup';
import PopupEvaluate from '~/components/popups/PopupEvaluate/PopupEvaluate';
import Dialog from '~/components/controls/Dialog/Dialog';
import {STATUS_ORDER} from '~/constants/mocks/enum';
import {RootState} from '~/redux/store';
import {useSelector} from 'react-redux';
import {toastWarn} from '~/common/func/toast';
import {httpRequest} from '~/services';
import orderServices from '~/services/orderServices';
import {useRouter} from 'next/router';
import LoadingScreen from '~/components/protected/LoadingScreen';

function ItemOrder({data}: TypeProductOrder) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);

	const [idOrder, setIdOrder] = useState<string>('');
	const [idProduct, setIdProduct] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [openCancel, setOpenCancel] = useState<boolean>(false);
	const [openSuccess, setOpenSuccess] = useState<boolean>(false);
	const [openPopupEvaluate, setOpenPopupEvaluate] = useState<boolean>(false);

	const handleCancel = () => {
		if (!token) {
			return toastWarn({msg: 'Bạn chưa đăng nhập!'});
		}
		if (!idOrder) {
			return toastWarn({msg: 'Không tìm thấy đơn hàng!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: orderServices.cancelOrder({
				token: token!,
				idOrder: idOrder,
			}),
		}).then((data) => {
			if (data) {
				setOpenCancel(false);
				router.replace(router.asPath, undefined, {scroll: false});
			}
		});
	};

	const handleDelete = () => {
		if (!token) {
			return toastWarn({msg: 'Bạn chưa đăng nhập!'});
		}
		if (!idOrder) {
			return toastWarn({msg: 'Không tìm thấy đơn hàng!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: orderServices.deleteOrder({
				token: token!,
				idOrder: idOrder,
			}),
		}).then((data) => {
			if (data) {
				setOpenCancel(false);
				router.replace(router.asPath, undefined, {scroll: false});
			}
		});
	};

	const handleSuccess = () => {
		if (!token) {
			return toastWarn({msg: 'Bạn chưa đăng nhập!'});
		}
		if (!idOrder) {
			return toastWarn({msg: 'Không tìm thấy đơn hàng!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: orderServices.successOrder({
				token: token!,
				idOrder: idOrder,
			}),
		}).then((data) => {
			if (data) {
				setOpenCancel(false);
				router.replace(router.asPath, undefined, {scroll: false});
			}
		});
	};

	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />
			<div className={styles.container}>
				<div className={styles.main}>
					{data?.listProduct?.map((v) => (
						<div key={v._id} className={styles.item}>
							<div className={styles.box_info}>
								<div className={styles.box_image}>
									<ImageFill fullHeight className={styles.image} src={v?.productId?.images?.[0]} />
								</div>
								<div className={styles.info}>
									<Link href={`/product/${v?.productId?._id}`} className={styles.name}>
										{v?.productId?.name}
									</Link>
									<p className={styles.text}>
										Đơn giá: {convertCoin(v?.price)}đ <span style={{margin: '0 8px'}}></span>
										<span>Khuyến mãi: {convertCoin(v?.sale)}%</span>
									</p>
									<p className={styles.text}>Số lượng: {v.quality}</p>
									<p className={styles.text}>Kích cỡ: {v?.sizeId?.size}</p>
								</div>
							</div>
							<div className={styles.right}>
								<div className={styles.bottom}>
									<p className={styles.text_1}>
										Thành tiền:{' '}
										{convertCoin(v?.price * v?.quality - (v?.price * v?.quality * v?.sale) / 100)}đ
									</p>
									{data?.statusOrder == STATUS_ORDER.DA_GIAO && (
										<>
											<div className={styles.line_2}></div>
											<p
												className={styles.btn_evaluate}
												onClick={() => {
													setOpenPopupEvaluate(true);
													setIdProduct(v?.productId?._id);
												}}
											>
												Đánh giá
											</p>
										</>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.line}></div>

				<div className={styles.bottom}>
					<h4 className={styles.text}>
						Giảm giá: <span className={styles.text_1}>{convertCoin(data?.discount)}đ</span>
					</h4>
					<h4 className={styles.text}>
						Phí vận chuyển: <span className={styles.text_1}>{convertCoin(data?.transportId?.price)}đ</span>
					</h4>
				</div>
				<div className={styles.bottom}>
					<h4 className={styles.total_price}>
						Tổng tiền: <span>{convertCoin(data?.totalOrder)}đ</span>
					</h4>
					{data?.statusOrder == STATUS_ORDER.CHO_XAC_NHAN && (
						<div className={styles.group_btn}>
							<Button
								warn
								p_6_12
								rounded_4
								w_fit
								onClick={() => {
									setOpenCancel(true);
									setIdOrder(data?._id);
								}}
							>
								Hủy đơn hàng
							</Button>
						</div>
					)}

					{data?.statusOrder == STATUS_ORDER.DA_XAC_NHAN && (
						<div className={styles.group_btn}>
							<Button
								green
								p_6_12
								rounded_4
								w_fit
								onClick={() => {
									setOpenSuccess(true);
									setIdOrder(data?._id);
								}}
							>
								Xác nhận đã nhận hàng
							</Button>
						</div>
					)}

					{data?.statusOrder == STATUS_ORDER.DA_GIAO || data?.statusOrder == STATUS_ORDER.DA_HUY ? (
						<div className={styles.group_btn}>
							<Button
								red
								p_6_12
								rounded_4
								w_fit
								onClick={() => {
									setOpenDelete(true);
									setIdOrder(data?._id);
								}}
							>
								Xóa đơn hàng
							</Button>
						</div>
					) : null}
				</div>
			</div>

			{/* Popup */}
			<Popup open={openPopupEvaluate} onClose={() => setOpenPopupEvaluate(false)}>
				<PopupEvaluate idProduct={idProduct} onClose={() => setOpenPopupEvaluate(false)} />
			</Popup>

			<Dialog
				open={openCancel}
				onClose={() => setOpenCancel(false)}
				title='Hủy đơn hàng'
				note='Bạn có chắc chắn muốn hủy đơn hàng này?'
				onSubmit={handleCancel}
			/>
			<Dialog
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title='Xóa đơn hàng'
				note='Bạn có chắc chắn muốn xóa đơn hàng này?'
				onSubmit={handleDelete}
			/>
			<Dialog
				open={openSuccess}
				onClose={() => setOpenSuccess(false)}
				title='Xác nhận đơn hàng'
				note='Bạn có chắc chắn muốn xác nhận đơn hàng giao thành công?'
				onSubmit={handleSuccess}
			/>
		</Fragment>
	);
}

export default ItemOrder;
