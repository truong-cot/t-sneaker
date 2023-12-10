import React, {useEffect, useState} from 'react';

import styles from './MayLikeProduct.module.scss';
import GridColumn from '~/components/layouts/GridColumn/GridColumn';
import CartProduct from '~/components/common/CartProduct/CartProduct';
import {httpRequest} from '~/services';
import productServices from '~/services/productServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingData from '~/components/protected/LoadingData';
import SkeletonLoading from '~/components/common/SkeletonLoading';
import SkeletonCardProduct from '~/components/common/SkeletonCardProduct';
import Image from 'next/image';
import icons from '~/constants/images/icons';

function MayLikeProduct({_category}: {_category: string}) {
	const {token} = useSelector((state: RootState) => state.auth);

	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (_category) {
			httpRequest({
				setLoading: setLoading,
				http: productServices.getList({
					token: token!,
					categoryId: _category as string,
					keyword: '',
					limit: 8,
					page: 1,
					statusId: '',
					priceFrom: null,
					priceTo: null,
					sort: {
						sortList: null,
						sortType: null,
					},
				}),
			}).then((data) => {
				if (data) {
					setData(data?.items);
				}
			});
		}
	}, [token, _category]);

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Sản phẩm tương tự</h4>
			<div className={styles.list}>
				<LoadingData
					isLoading={loading}
					load={
						<GridColumn col_4>
							<SkeletonLoading Item={SkeletonCardProduct} count={4} />
						</GridColumn>
					}
				>
					{data?.length > 0 ? (
						<GridColumn col_4>
							{data.map((v, i) => (
								<CartProduct data={v} key={i} />
							))}
						</GridColumn>
					) : (
						<div className={styles.empty}>
							<Image src={icons.NoItemsCart} alt='empty product' width={240} height={240} />
							<h5 className={styles.text_empty}>Hiện tại chúng tôi chưa có sản phẩm tương tự nào!</h5>
						</div>
					)}
				</LoadingData>
			</div>
		</div>
	);
}

export default MayLikeProduct;
