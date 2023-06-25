import React from 'react';
import {PropsNewProduct} from './interfaces';

import styles from './NewProduct.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';
import GridColumn from '~/components/layouts/GridColumn';
import CartProduct from '~/components/common/CartProduct';

function NewProduct({}: PropsNewProduct) {
	return (
		<LayoutGrid>
			<div className={styles.container}>
				<h4 className={styles.title}>SẢN PHẨM MỚI NHẤT</h4>
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

export default NewProduct;
