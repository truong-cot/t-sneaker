import React, {useContext, useMemo} from 'react';

import styles from './ProvisionalMoney.module.scss';
import {PropsProvisionalMoney} from './interfaces';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import {ContextCart, TypeContext} from '../context';
import {toastWarn} from '~/common/func/toast';
import {useRouter} from 'next/router';
import {signJWT} from '~/common/func/jwt';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function ProvisionalMoney({}: PropsProvisionalMoney) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);

	// Gọi context
	const context = useContext<TypeContext>(ContextCart);

	const temporaryMoney = useMemo(() => {
		return context?.totalPriceCart - context?.discount;
	}, [context?.discount, context?.totalPriceCart]);

	// Hàm submit
	const handleSubmit = () => {
		if (!token) {
			return toastWarn({msg: 'Vui lòng đăng nhập vào hệ thống!'});
		}

		if (context.listCart.length > 0) {
			const dataSubmit = signJWT({
				discount: context?.discount,
				listProduct: context.listCart,
				totalPriceCart: context?.totalPriceCart,
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
				<p className={styles.text_2}>{convertCoin(context.totalPriceCart)}đ</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Giảm giá: </p>
				<p className={styles.text_2}>{convertCoin(context?.discount)}đ</p>
			</div>
			<div className={styles.item}>
				<p className={styles.text_1}>Tổng tạm tính: </p>
				<p className={styles.text_3}>{convertCoin(temporaryMoney)}đ</p>
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
