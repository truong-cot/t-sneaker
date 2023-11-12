import React from 'react';
import {PropsDescriptionProduct} from './interfaces';
import styles from './DescriptionProduct.module.scss';
import DescriptionText from '~/components/common/DescriptionText';

function DescriptionProduct({des}: PropsDescriptionProduct) {
	return (
		<div className={styles.container}>
			<div className={styles.line}></div>
			<h4 className={styles.title}>Mô tả chi tiết sản phẩm</h4>
			<DescriptionText des={des} />
		</div>
	);
}

export default DescriptionProduct;
