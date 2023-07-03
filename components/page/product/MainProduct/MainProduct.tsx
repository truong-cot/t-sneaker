import React from 'react';

import {PropsMainProduct} from './interfaces';
import styles from './MainProduct.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';

function MainProduct({}: PropsMainProduct) {
	return (
		<div className={styles.container}>
			<Breadcrumb
				titles={[
					'Trang chủ',
					'Cửa hàng',
					'Giày Nike',
					'Giày nike cổ cao',
				]}
				listHref={['/', '/shop', '/category/123']}
			/>
		</div>
	);
}

export default MainProduct;
