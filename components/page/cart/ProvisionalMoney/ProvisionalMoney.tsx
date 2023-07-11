import React, {useContext, useMemo} from 'react';

import styles from './ProvisionalMoney.module.scss';
import {PropsProvisionalMoney} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import {ContextCart, TypeContext} from '../context';
import {MONEY, PRICE_SHIPPING} from '~/constants/mocks/enum';
import {toastWarn} from '~/common/func/toast';

function ProvisionalMoney({}: PropsProvisionalMoney) {
	// Gọi context
	const context = useContext<TypeContext>(ContextCart);

	// Tính khuyễn mãi vận chuyển
	const priceShipping = useMemo(() => {
		if (context.totalPriceChosseCart == 0) {
			return 0;
		}
		if (
			context.totalPriceChosseCart > MONEY.FREE_00 &&
			context.totalPriceChosseCart < MONEY.FREE_15
		) {
			return PRICE_SHIPPING.SHIPPING_01;
		} else if (
			context.totalPriceChosseCart > MONEY.FREE_15 &&
			context.totalPriceChosseCart < MONEY.FREE_25
		) {
			return PRICE_SHIPPING.SHIPPING_02;
		} else {
			return PRICE_SHIPPING.SHIPPING_03;
		}
	}, [context.listCart]);

	// Tính tổng tiền tạm tính
	const totalPrice = useMemo(() => {
		if (priceShipping == PRICE_SHIPPING.SHIPPING_03) {
			return context.totalPriceChosseCart - 0;
		} else {
			return context.totalPriceChosseCart - priceShipping;
		}
	}, [context.totalPriceChosseCart, priceShipping]);

	// Hàm submit
	const handleSubmit = () => {
		if (context.listCart.length == 0) {
			return toastWarn({msg: 'Vui lòng chọn sản phẩm để thanh toán!'});
		} else {
			const dataSubmit = {
				listProduct: context.listCart,
				temporaryPrice: context.totalPriceChosseCart,
				freeShipping: priceShipping,
			};
			console.log(dataSubmit);
		}
	};

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Tổng tiền tạm tính</h4>
			<div className={styles.item}>
				<p className={styles.text_1}>Thành tiền: </p>
				<p className={styles.text_2}>
					{convertCoin(context.totalPriceChosseCart)}đ
				</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Khuyến mãi vận chuyển: </p>
				<p className={styles.text_2}>
					{priceShipping == PRICE_SHIPPING.SHIPPING_03 ? (
						`${priceShipping}`
					) : (
						<>
							<span>-</span>
							{'  '}
							{convertCoin(priceShipping)}đ
						</>
					)}
				</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Tổng tạm tính: </p>
				<p className={styles.text_3}>{convertCoin(totalPrice)}đ</p>
				{priceShipping == PRICE_SHIPPING.SHIPPING_03 && (
					<span className={styles.note}>
						(Chưa tính phí vận chuyển)
					</span>
				)}
			</div>
			<div className={styles.btn}>
				<Button purple bold onClick={handleSubmit}>
					Thanh toán
				</Button>
			</div>
		</div>
	);
}

export default ProvisionalMoney;
