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
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {IAddress} from '../../profile/MainListAddress/interfaces';
import {httpRequest} from '~/services';
import addressServices from '~/services/addressServices';

function MainPayment({}: PropsMainPayment) {
	const router = useRouter();
	const {cart} = router.query;

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [addressUser, setAddressUser] = useState<IAddress | null>(null);

	const [listAddress, setListAddress] = useState<IAddress[]>([]);
	const [data, setData] = useState<any>();
	const [transportId, setTransportId] = useState<string>('');
	const [priceShipping, setPriceShipping] = useState<number>(0);
	const [infoReceiver, setInfoReceiver] = useState<{
		name: string;
		phone: string;
		note: string;
	}>({
		name: '',
		phone: '',
		note: '',
	});
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
		specific: '',
	});

	useEffect(() => {
		httpRequest({
			http: addressServices.getAddress({
				token: token!,
				userId: infoUser?._id!,
			}),
		}).then((data) => {
			if (data) {
				setListAddress(data);
			}
		});
	}, [token, infoUser?._id, router]);

	useEffect(() => {
		if (cart) {
			(async () => {
				const res: any = await verifyJWT(cart as string, router);
				setData(res);
			})();
		}
	}, [cart, router]);

	return (
		<div className={styles.container}>
			<Breadcrumb titles={['Trang chủ', 'Giỏ hàng của bạn', 'Thanh toán đơn hàng']} listHref={['/', '/cart']} />
			<ContextPayment.Provider
				value={{
					data,
					transportId,
					setTransportId,
					infoReceiver,
					setInfoReceiver,
					address,
					setAddress,
					priceShipping,
					setPriceShipping,
					addressUser,
					setAddressUser,
				}}
			>
				<div className={styles.wrapper}>
					<div>
						{listAddress?.length > 0 ? (
							<AddressDelivery
								listAddress={listAddress}
								infoReceiver={infoReceiver}
								setInfoReceiver={setInfoReceiver}
							/>
						) : (
							<FormAddress
								infoReceiver={infoReceiver}
								setInfoReceiver={setInfoReceiver}
								address={address}
								setAddress={setAddress}
							/>
						)}
						<PaymentMethods />
					</div>
					<ResultPayment />
				</div>
			</ContextPayment.Provider>
		</div>
	);
}

export default MainPayment;
