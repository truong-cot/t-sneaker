import React, {useEffect, useState} from 'react';

import {PropsDiscountProducts} from './interfaces';
import styles from './DiscountProducts.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import GridColumn from '~/components/layouts/GridColumn/GridColumn';
import CartProduct from '~/components/common/CartProduct/CartProduct';
import LoadingData from '~/components/protected/LoadingData';
import SkeletonLoading from '~/components/common/SkeletonLoading';
import SkeletonCardProduct from '~/components/common/SkeletonCardProduct';
import {httpRequest} from '~/services';
import productServices from '~/services/productServices';

function DiscountProducts({}: PropsDiscountProducts) {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		httpRequest({
			setLoading,
			http: productServices.getSaleProducts({}),
		}).then((data) => {
			if (data) {
				setData(data);
			}
		});
	}, []);

	return (
		<LayoutGrid>
			<div className={styles.container}>
				<div className={styles.head}>
					<Image src={icons.giasoc} alt='gia soc' />
					<Image src={icons.dealFlashIcon} alt='gia soc' className={styles.flash} />
					<Image src={icons.homnay} alt='hom nay' />
				</div>
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

export default DiscountProducts;
