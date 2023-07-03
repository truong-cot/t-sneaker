import React from 'react';
import {PropsMainCategory} from './interface';

import styles from './MainCategory.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';

function MainCategory({}: PropsMainCategory) {
	return (
		<div className={styles.container}>
			<Breadcrumb
				titles={['Trang chủ', 'Cửa hàng', 'Giày Nike']}
				listHref={['/', '/shop']}
			/>
		</div>
	);
}

export default MainCategory;
