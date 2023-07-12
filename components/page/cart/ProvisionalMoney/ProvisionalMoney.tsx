import React, {useContext, useMemo} from 'react';

import styles from './ProvisionalMoney.module.scss';
import {PropsProvisionalMoney} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import {ContextCart, TypeContext} from '../context';
import {MONEY, PRICE_SHIPPING} from '~/constants/mocks/enum';
import {toastWarn} from '~/common/func/toast';
import {useRouter} from 'next/router';
import {signJWT} from '~/common/func/jwt';

function ProvisionalMoney({}: PropsProvisionalMoney) {
	const router = useRouter();

	// Gọi context
	const context = useContext<TypeContext>(ContextCart);

	// Tính khuyến mãi vận chuyển
	const priceShipping = useMemo(() => {
		if (context.totalPriceChosseCart == 0) {
			return 0;
		}

		// Đơn hàng từ 500 - 1tr5 ==> phí ship = 15k
		if (
			context.totalPriceChosseCart > MONEY.FREE_00 &&
			context.totalPriceChosseCart < MONEY.FREE_15
		) {
			return PRICE_SHIPPING.SHIPPING_01;
		}
		// Đơn hàng từ 1tr5 - 3tr ==> phí ship = 25k
		else if (
			context.totalPriceChosseCart > MONEY.FREE_15 &&
			context.totalPriceChosseCart < MONEY.FREE_25
		) {
			return PRICE_SHIPPING.SHIPPING_02;
		}
		// Đơn hàng từ 3tr ==> free ship
		else {
			return PRICE_SHIPPING.SHIPPING_03;
		}
	}, [context.listCart]);

	// Tính tổng tiền tạm tính
	const totalPrice = useMemo(() => {
		return context.totalPriceChosseCart - priceShipping;
	}, [context.totalPriceChosseCart, priceShipping]);

	// Hàm submit
	const handleSubmit = () => {
		if (context.listCart.length > 0) {
			const dataSubmit = signJWT({
				listProduct: context.listCart,
				temporaryPrice: context.totalPriceChosseCart,
				freeShipping: priceShipping,
			});
			router.push(`/payment?cart=${dataSubmit}`, undefined);
		} else {
			return toastWarn({msg: 'Vui lòng chọn sản phẩm để thanh toán!'});
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
				<p className={styles.text_2}>{convertCoin(priceShipping)}đ</p>
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
