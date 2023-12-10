import React, {useContext, useEffect, useState} from 'react';
import styles from './PaymentMethods.module.scss';
import {PropsMedthod, PropsPaymentMethods} from './interfaces';
import {ContextPayment, TypeContextPayment} from '../context';
import {httpRequest} from '~/services';
import transportServices from '~/services/transportServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function PaymentMethods({}: PropsPaymentMethods) {
	const context = useContext<TypeContextPayment>(ContextPayment);

	const {token} = useSelector((state: RootState) => state.auth);

	const [methods, setMethods] = useState<PropsMedthod[]>([]);

	useEffect(() => {
		httpRequest({
			http: transportServices.getList({
				token: token!,
			}),
		}).then((data) => {
			if (data) {
				setMethods(data);
				context?.setTransportId(data[0]?._id);
				context?.setPriceShipping(data[0]?.price);
			}
		});
	}, [token]);

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Hình thức thanh toán</h4>
			<div className={styles.main}>
				{methods?.map((v) => (
					<div key={v?._id} className={styles.item}>
						<input
							className={styles.radio}
							type='radio'
							id={v._id}
							name={v._id}
							value={v?._id}
							checked={v?._id == context?.transportId}
							onClick={() => {
								context?.setTransportId(v?._id);
								context?.setPriceShipping(v?.price);
							}}
							onChange={() => {
								context?.setTransportId(v?._id);
								context?.setPriceShipping(v?.price);
							}}
						/>
						<label className={styles.label} htmlFor={v?._id}>
							{v?.name}
						</label>
					</div>
				))}
			</div>
		</div>
	);
}

export default PaymentMethods;
