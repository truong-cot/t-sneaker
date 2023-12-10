import React, {useEffect, useState} from 'react';

import styles from './MainMyOrder.module.scss';
import {PropsMainMyOrder} from './interfaces';
import TabNavLinkActive from '~/components/controls/TabNavLinkActive';
import ItemOrder from './components/ItemOrder';
import {httpRequest} from '~/services';
import orderServices from '~/services/orderServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import {STATUS_ORDER} from '~/constants/mocks/enum';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import icons from '~/constants/images/icons';

function MainMyOrder({}: PropsMainMyOrder) {
	const router = useRouter();

	const {_status} = router.query;

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any[]>([]);

	const listTab: Array<any> = [
		{
			title: 'Đang xử lý',
			query: null,
			pathname: '/profile/my-order',
		},
		{
			title: 'Đang giao',
			query: 'delivering',
			pathname: '/profile/my-order',
		},
		{
			title: 'Đã hoàn thành',
			query: 'accomplished',
			pathname: '/profile/my-order',
		},
		{
			title: 'Đã hủy',
			query: 'cancelled',
			pathname: '/profile/my-order',
		},
	];

	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: orderServices.getListOrderUser({
				token: token!,
				userId: infoUser?._id!,
				statusOrder: !_status
					? STATUS_ORDER.CHO_XAC_NHAN
					: _status == 'delivering'
					? STATUS_ORDER.DA_XAC_NHAN
					: _status == 'accomplished'
					? STATUS_ORDER.DA_GIAO
					: STATUS_ORDER.DA_HUY,
			}),
		}).then((data) => {
			if (data) {
				setData(data);
			}
		});
	}, [token, infoUser?._id, _status, router]);

	return (
		<div className={styles.container}>
			<TabNavLinkActive listHref={listTab} query='_status' />
			<div className={styles.main}>
				<DataWrapper
					data={data}
					loading={loading}
					noti={
						<Noti
							disableButton
							title='Đơn hàng trống!'
							des='Hiện tại chưa có lịch sữ đặt hàng nào!'
							img={icons.NoItemsCart_removebg}
						/>
					}
				>
					{data.map((v) => (
						<ItemOrder key={v._id} data={v} />
					))}
				</DataWrapper>
			</div>
		</div>
	);
}

export default MainMyOrder;
