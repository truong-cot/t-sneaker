import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import styles from './UserCart.module.scss';

interface TypeUser {
	image: any;
	isActive?: boolean;
}

function UserCart({image, isActive}: TypeUser) {
	return (
		<div className={clsx(styles.container, {[styles.active]: isActive})}>
			<div className={styles.box_image}>
				<Image
					layout='fill'
					objectFit='cover'
					className={styles.image}
					src={image}
					alt=''
				/>
			</div>
		</div>
	);
}

export default UserCart;
