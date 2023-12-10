import React, {useEffect, useState} from 'react';
import {PropsHotsProduct} from './interfaces';

import styles from './HotsProduct.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';
import GridColumn from '~/components/layouts/GridColumn';
import CartProduct from '~/components/common/CartProduct';
import {httpRequest} from '~/services';
import productServices from '~/services/productServices';
import LoadingData from '~/components/protected/LoadingData';
import SkeletonLoading from '~/components/common/SkeletonLoading';
import SkeletonCardProduct from '~/components/common/SkeletonCardProduct';
import Image from 'next/image';
import icons from '~/constants/images/icons';

function HotsProduct({}: PropsHotsProduct) {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		httpRequest({
			setLoading,
			http: productServices.getBestSellers({}),
		}).then((data) => {
			if (data) {
				setData(data);
			}
		});
	}, []);

	return (
		<LayoutGrid>
			<div className={styles.container}>
				<h4 className={styles.title}>SẢN PHẨM ĐANG HOT CỦA T - Sneaker</h4>
				<div className={styles.list}>
					<LoadingData
						isLoading={loading}
						load={
							<GridColumn col_4>
								<SkeletonLoading Item={SkeletonCardProduct} count={8} />
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
								<h5 className={styles.text_empty}>Hiện tại chúng tôi chưa có sản phẩm nào!</h5>
							</div>
						)}
					</LoadingData>
				</div>
			</div>
		</LayoutGrid>
	);
}

export default HotsProduct;
