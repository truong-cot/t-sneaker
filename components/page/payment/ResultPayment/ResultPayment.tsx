import React, {useContext, useMemo, useState} from 'react';

import styles from './ResultPayment.module.scss';
import {PropsResultPayment} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import {ContextPayment, TypeContextPayment} from '../context';
import {useRouter} from 'next/router';
import {toastText} from '~/common/func/toast';
import {httpRequest} from '~/services';
import orderServices from '~/services/orderServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingScreen from '~/components/protected/LoadingScreen';

function ResultPayment({}: PropsResultPayment) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	// Gọi context
	const context = useContext<TypeContextPayment>(ContextPayment);
	const {data} = context;

	const [loading, setLoading] = useState<boolean>(false);
	const [isRule, setIsRules] = useState<boolean>(false);

	const totalOrder = useMemo(() => {
		return data?.totalPriceCart + context?.priceShipping - data?.discount;
	}, [data?.totalPriceCart, context?.priceShipping, data?.discount]);

	const handlePayment = () => {
		const regexPhone =
			/^(\+84|84|0)(1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|7[0-9]|8[0-9]|70|56|58|59|9[0-9]|86|88|89)([0-9]{7})$/;

		if (!context?.infoReceiver?.name) {
			return toastText({msg: 'Vui lòng thêm tên người nhận hàng!'});
		}
		if (!context?.infoReceiver?.phone) {
			return toastText({msg: 'Vui lòng thêm số điện thoại người nhận hàng!'});
		}
		if (regexPhone.test(context?.infoReceiver?.phone) == false) {
			return toastText({msg: 'Số điện thoại không hợp lệ!'});
		}
		if (
			!context?.addressUser &&
			(!context?.address?.province?.id || !context?.address?.district?.id || !context?.address?.ward?.id)
		) {
			return toastText({msg: 'Vui lòng thêm địa chỉ nhận hàng!'});
		}
		if (!context?.transportId) {
			return toastText({msg: 'Vui lòng chọn hình thức thanh toán!'});
		}
		if (!isRule) {
			return toastText({msg: 'Vui lòng xác nhận điều khoản để đặt hàng!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: orderServices.createOrder({
				token: token!,
				userId: infoUser?._id as string,
				nameReceiver: context?.infoReceiver?.name,
				phoneReceiver: context?.infoReceiver?.phone,
				address: context?.addressUser
					? context?.addressUser?.address
					: `${context?.address?.specific}, ${context?.address?.ward?.name}, ${context?.address?.district?.name}, ${context?.address?.province?.name}`,
				note: context?.infoReceiver?.note,
				transportId: context?.transportId,
				discount: context?.data?.discount,
				priceShipping: context?.priceShipping,
				totalPriceCart: context?.data?.totalPriceCart,
				totalOrder: totalOrder,
				listProduct: context?.data?.listProduct?.map((v) => ({
					idCart: v?._id,
					productId: v?.productId?._id,
					nameProduct: v?.productId.name,
					price: v?.productId?.price,
					sale: v?.productId?.sale,
					quality: v?.quality,
					sizeId: v?.sizeId?._id,
				})),
			}),
		}).then((data) => {
			if (data) {
				context?.setAddress({
					province: {
						id: null,
						name: '',
					},
					district: {
						id: null,
						name: '',
					},
					ward: {
						id: null,
						name: '',
					},
					specific: '',
				});
				context?.setInfoReceiver({
					name: '',
					phone: '',
					note: '',
				});
				router.push(`/payment/success?orderId=${data?._id}`);
			}
		});
	};

	return (
		<div className={styles.container}>
			<LoadingScreen isLoading={loading} />
			<h4 className={styles.title}>ĐƠN HÀNG CỦA BẠN</h4>
			<div className={styles.list}>
				<div className={styles.item_1}>
					<p className={styles.text_4}>Sản phẩm</p>
					<p className={styles.text_4}>Số lượng</p>
				</div>
				{data?.listProduct?.map((v, i) => (
					<div className={styles.item_2} key={i}>
						<p className={styles.name_product}>
							{`${i + 1}. ${v?.productId?.name}`} - ({v?.sizeId?.size})
						</p>
						<p className={styles.price_product}>{v?.quality}</p>
					</div>
				))}
			</div>
			<div className={styles.bottom}>
				<div className={styles.item}>
					<p className={styles.text_1}>Tạm tính: </p>
					<p className={styles.text_2}>{convertCoin(data?.totalPriceCart)}đ</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Phí vận chuyển: </p>
					<p className={styles.text_2}>{convertCoin(context?.priceShipping)}đ</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Giảm giá: </p>
					<p className={styles.text_2}>
						-{'  '}
						{convertCoin(data?.discount)}đ
					</p>
				</div>
				<div className={styles.item}>
					<p className={styles.text_1}>Tổng thanh toán: </p>
					<p className={styles.text_3}>{convertCoin(totalOrder)}đ</p>
				</div>
			</div>
			<div className={styles.box_check}>
				<input
					className={styles.radio}
					type='checkbox'
					id='rules'
					name='rules'
					value={1}
					checked={isRule}
					onClick={() => setIsRules(!isRule)}
					onChange={() => setIsRules(!isRule)}
				/>
				<label className={styles.label} htmlFor='rules'>
					Bạn đã hiểu chỉnh sách đặt hàng của T - Sneaker
				</label>
			</div>
			<div className={styles.btn}>
				<div>
					<Button w_fit bright_red p_10_32 rounded_8 onClick={handlePayment}>
						Đặt hàng
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ResultPayment;
