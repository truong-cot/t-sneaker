import React from 'react';
import {PropsHotsProduct} from './interfaces';

import styles from './HotsProduct.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';
import GridColumn from '~/components/layouts/GridColumn';
import CartProduct from '~/components/common/CartProduct';

function HotsProduct({}: PropsHotsProduct) {
	return (
		<LayoutGrid>
			<div className={styles.container}>
				<h4 className={styles.title}>
					SẢN PHẨM ĐANG HOT CỦA T - Sneaker
				</h4>
				<div className={styles.list}>
					<GridColumn col_4>
						<CartProduct />
						<CartProduct />
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

export default HotsProduct;
