import React, {useEffect, useState} from 'react';
import {PropsMainShop} from './interfaces';

import styles from './MainShop.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import SidebarShop from '../SidebarShop';
import ArrangeShow from '../ArrangeShow';
import LoadingData from '~/components/protected/LoadingData';
import GridColumn from '~/components/layouts/GridColumn';
import CartProduct from '~/components/common/CartProduct';
import SkeletonLoading from '~/components/common/SkeletonLoading';
import SkeletonCardProduct from '~/components/common/SkeletonCardProduct';

import {httpRequest} from '~/services';
import productServices from '~/services/productServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import Pagination from '~/components/controls/Pagination';
import Image from 'next/image';
import icons from '~/constants/images/icons';

function MainShop({}: PropsMainShop) {
	const router = useRouter();

	const pageSize = 9;

	const {token} = useSelector((state: RootState) => state.auth);

	const {_category, _status, _priceFrom, _priceTo, _sortList, _sortType, page} = router.query;

	const [data, setData] = useState<any[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	// Call api
	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: productServices.getList({
				token: token!,
				categoryId: _category as string,
				keyword: '',
				limit: pageSize,
				page: Number(page),
				statusId: _status as string,
				priceFrom: Number(_priceFrom),
				priceTo: Number(_priceTo),
				sort: {
					sortList: _sortList ? Number(_sortList) : null,
					sortType: _sortType ? Number(_sortType) : null,
				},
			}),
		}).then((data) => {
			if (data) {
				setData(data?.items);
				setTotal(data?.pagination?.totalCount);
			}
		});
	}, [token, _category, _status, _priceFrom, _priceTo, _sortList, _sortType, page]);

	return (
		<div className={styles.container}>
			<Breadcrumb titles={['Trang chủ', 'Cửa hàng']} listHref={['/']} />
			<div className={styles.main}>
				<SidebarShop />
				<div className={styles.content}>
					<ArrangeShow />
					<div className={styles.list}>
						<LoadingData
							isLoading={loading}
							load={
								<GridColumn col_3>
									<SkeletonLoading Item={SkeletonCardProduct} count={6} />
								</GridColumn>
							}
						>
							{data?.length > 0 ? (
								<GridColumn col_3>
									{data.map((v, i) => (
										<CartProduct data={v} key={i} />
									))}
								</GridColumn>
							) : (
								<div className={styles.empty}>
									<Image src={icons.NoItemsCart} alt='empty product' width={240} height={240} />
									<h5 className={styles.text_empty}>Hiện tại chúng tôi chưa có sản phẩm nào!</h5>
								</div>
							)}
						</LoadingData>
					</div>
					{data?.length > pageSize && (
						<div className={styles.pagination}>
							<Pagination
								total={total}
								pageSize={pageSize}
								currentPage={Number(page) || 1}
								dependencies={[_category, _status, _priceFrom, _priceTo, _sortList, _sortType]}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default MainShop;
