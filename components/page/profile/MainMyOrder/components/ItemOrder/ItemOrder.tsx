import React, {useState} from 'react';

import styles from './ItemOrder.module.scss';
import {TypeProductOrder} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import Link from 'next/link';
import Popup from '~/components/common/Popup';
import PopupEvaluate from '~/components/popups/PopupEvaluate/PopupEvaluate';
import Dialog from '~/components/controls/Dialog/Dialog';

function ItemOrder({}: TypeProductOrder) {
	const [openCancel, setOpenCancel] = useState<boolean>(false);
	const [openPopupEvaluate, setOpenPopupEvaluate] = useState<boolean>(false);

	const handleCancel = () => {};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.main}>
					<div className={styles.item}>
						<div className={styles.box_info}>
							<div className={styles.box_image}>
								<ImageFill fullHeight className={styles.image} />
							</div>
							<div className={styles.info}>
								<Link href={'/product/123'} className={styles.name}>
									Tên sản phẩm
								</Link>
								<p className={styles.text}>Đơn giá: {convertCoin(1250000)}đ</p>
								<p className={styles.text}>Số lượng: 4</p>
								<p className={styles.text}>Kích cỡ: 38</p>
							</div>
						</div>
						<div className={styles.right}>
							<div className={styles.bottom}>
								<p className={styles.text_1}>Thành tiền: {convertCoin(1250000)}đ</p>
								<div className={styles.line_2}></div>
								<p className={styles.btn_evaluate} onClick={() => setOpenPopupEvaluate(true)}>
									Đánh giá
								</p>
							</div>
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.box_info}>
							<div className={styles.box_image}>
								<ImageFill fullHeight className={styles.image} />
							</div>
							<div className={styles.info}>
								<Link href={'/product/123'} className={styles.name}>
									Tên sản phẩm
								</Link>
								<p className={styles.text}>Đơn giá: {convertCoin(1250000)}đ</p>
								<p className={styles.text}>Số lượng: 4</p>
								<p className={styles.text}>Kích cỡ: 38</p>
							</div>
						</div>
						<div className={styles.right}>
							<div className={styles.bottom}>
								<p className={styles.text_1}>Thành tiền: {convertCoin(1250000)}đ</p>
								<div className={styles.line_2}></div>
								<p className={styles.btn_evaluate} onClick={() => setOpenPopupEvaluate(true)}>
									Đánh giá
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.line}></div>
				<div className={styles.bottom}>
					<h4 className={styles.total_price}>
						Tổng tiền: <span>{convertCoin(12400000)}đ</span>
					</h4>
					<div className={styles.group_btn}>
						<Button red p_6_12 rounded_4 w_fit onClick={() => setOpenCancel(true)}>
							Hủy đơn hàng
						</Button>
					</div>
				</div>
			</div>

			{/* Popup */}
			<Popup open={openPopupEvaluate} onClose={() => setOpenPopupEvaluate(false)}>
				<PopupEvaluate onClose={() => setOpenPopupEvaluate(false)} />
			</Popup>

			<Dialog
				open={openCancel}
				onClose={() => setOpenCancel(false)}
				title='Hủy đơn hàng'
				note='Bạn có chắc chắn muốn hủy đơn hàng này?'
				onSubmit={handleCancel}
			/>
		</>
	);
}

export default ItemOrder;
