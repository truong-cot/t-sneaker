import React, {useEffect, useState} from 'react';

import styles from './MainPayment.module.scss';
import {PropsAddress, PropsMainPayment} from './interfaces';
import Breadcrumb from '~/components/common/Breadcrumb';
import {useRouter} from 'next/router';
import {verifyJWT} from '~/common/func/jwt';
import {ContextPayment} from '../context';
import AddressDelivery from '../AddressDelivery';
import PaymentMethods from '../PaymentMethods';
import ResultPayment from '../ResultPayment';
import FormAddress from '../FormAddress';

function MainPayment({}: PropsMainPayment) {
	const router = useRouter();
	const {cart} = router.query;

	const isAddress = true;

	const [data, setData] = useState<any>();
	const [address, setAddress] = useState<PropsAddress>({
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
	});

	useEffect(() => {
		if (cart) {
			(async () => {
				const res = await verifyJWT(cart as string, router);
				setData(res);
			})();
		}
	}, [cart, router]);

	return (
		<div className={styles.container}>
			<Breadcrumb titles={['Trang chủ', 'Giỏ hàng của bạn', 'Thanh toán đơn hàng']} listHref={['/', '/cart']} />
			<ContextPayment.Provider value={{data: data, address: address, setAddress: setAddress}}>
				<div className={styles.wrapper}>
					<div>
						{isAddress ? <AddressDelivery /> : <FormAddress address={address} setAddress={setAddress} />}
						<PaymentMethods />
					</div>
					<ResultPayment />
				</div>
			</ContextPayment.Provider>
		</div>
	);
}

export default MainPayment;
