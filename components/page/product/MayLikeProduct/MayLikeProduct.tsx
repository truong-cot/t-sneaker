import React from 'react';

import styles from './MayLikeProduct.module.scss';
import GridColumn from '~/components/layouts/GridColumn/GridColumn';
import CartProduct from '~/components/common/CartProduct/CartProduct';

function MayLikeProduct() {
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Sản phẩm bạn có thể thích</h4>
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
	);
}

export default MayLikeProduct;
