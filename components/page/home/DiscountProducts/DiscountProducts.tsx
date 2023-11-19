import React from 'react';

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

function DiscountProducts({}: PropsDiscountProducts) {
	return (
		<LayoutGrid>
			{/* <div className={styles.container}>
				<div className={styles.head}>
					<Image src={icons.giasoc} alt='gia soc' />
					<Image src={icons.dealFlashIcon} alt='gia soc' className={styles.flash} />
					<Image src={icons.homnay} alt='hom nay' />
				</div>
				<div className={styles.list}>
					<LoadingData
						isLoading={false}
						// text='abc'
						load={
							<GridColumn col_4>
								<SkeletonLoading Item={SkeletonCardProduct} count={8} />
							</GridColumn>
						}
					>
						<GridColumn col_4>
							<CartProduct data={} />
							<CartProduct />
							<CartProduct />
							<CartProduct />
							<CartProduct />
							<CartProduct />
						</GridColumn>
					</LoadingData>
				</div>
			</div> */}
		</LayoutGrid>
	);
}

export default DiscountProducts;
