import React, {useEffect, useState} from 'react';

import styles from './MainPayment.module.scss';
import {PropsMainPayment} from './interfaces';
import Breadcrumb from '~/components/common/Breadcrumb';
import {useRouter} from 'next/router';
import {verifyJWT} from '~/common/func/jwt';
import {ContextPayment} from '../context';
import AddressDelivery from '../AddressDelivery';
import PaymentMethods from '../PaymentMethods';
import ResultPayment from '../ResultPayment';

function MainPayment({}: PropsMainPayment) {
	const router = useRouter();
	const {cart} = router.query;

	const isAddress = false;

	const [data, setData] = useState<any>();

	useEffect(() => {
		if (cart) {
			(async () => {
				const res = await verifyJWT(cart as string, router);
				setData(res);
			})();
		} else {
			router.push('/404', undefined);
		}
	}, [cart]);

	console.log(data);

	return (
		<div className={styles.container}>
			<Breadcrumb
				titles={[
					'Trang chủ',
					'Giỏ hàng của bạn',
					'Thanh toán đơn hàng',
				]}
				listHref={['/', '/cart']}
			/>
			<ContextPayment.Provider value={{data: data}}>
				<div className={styles.wrapper}>
					<div>
						<AddressDelivery />
						<PaymentMethods />
					</div>
					<ResultPayment />
				</div>
			</ContextPayment.Provider>
		</div>
	);
}

export default MainPayment;
