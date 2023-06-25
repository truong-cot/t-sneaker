import React from 'react';

import {PropsFooterContact} from './interfaces';
import styles from './FooterContact.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';

function FooterContact({}: PropsFooterContact) {
	return (
		<div className={styles.container}>
			<LayoutGrid>
				<p className={styles.text}>
					© 2022 T - Sneaker. All rights reserved. Nguyễn Văn Thông
				</p>
			</LayoutGrid>
		</div>
	);
}

export default FooterContact;
