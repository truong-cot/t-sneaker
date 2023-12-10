import React from 'react';
import styles from './PaymentSuccess.module.scss';
import Page from '~/components/layouts/Page';
import * as ordersuccess from '../../../public/static/anim/ordersuccess.json';
import Lottie from 'react-lottie';
import Button from '~/components/controls/Button/Button';
import RequireAuth from '~/components/protected/RequiredAuth';
import {useRouter} from 'next/router';

function PaymentSuccess() {
	const router = useRouter();

	const {orderId} = router.query;

	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: ordersuccess,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<RequireAuth>
			<Page disabledEffect title='Đặt hàng thành công'>
				<div className={styles.container}>
					<div className={styles.logo}>
						<Lottie
							style={{
								width: '36vw',
								height: '50vh',
							}}
							options={defaultOptions2}
						/>
					</div>
					<h4 className={styles.title}>Đặt hàng thành công</h4>
					<div className={styles.list_btn}>
						<Button w_fit p_10_32 primary_line rounded_24 href='/'>
							Quay về trang chủ
						</Button>
						<Button w_fit p_10_32 secondary rounded_24 href='/profile/my-order'>
							Xem chi tiết đơn hàng
						</Button>
					</div>
				</div>
			</Page>
		</RequireAuth>
	);
}

export default PaymentSuccess;
