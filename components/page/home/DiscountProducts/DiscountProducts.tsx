import React from 'react';

import {PropsDiscountProducts} from './interfaces';
import styles from './DiscountProducts.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import GridColumn from '~/components/layouts/GridColumn/GridColumn';
import CartProduct from '~/components/common/CartProduct/CartProduct';

function DiscountProducts({}: PropsDiscountProducts) {
	return (
		<LayoutGrid>
			<div className={styles.container}>
				<div className={styles.head}>
					<Image src={icons.giasoc} alt='gia soc' />
					<Image
						src={icons.dealFlashIcon}
						alt='gia soc'
						className={styles.flash}
					/>
					<Image src={icons.homnay} alt='hom nay' />
				</div>
				<div className={styles.list}>
					<GridColumn col_3>
						<CartProduct />
						<CartProduct />
						<CartProduct />
						<CartProduct />
						<CartProduct />
					</GridColumn>
				</div>
			</div>
		</LayoutGrid>
	);
}

export default DiscountProducts;
