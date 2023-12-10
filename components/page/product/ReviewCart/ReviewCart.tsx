import React from './ReviewCart.module.scss';
import {PropsReviewCart} from './interfaces';

import styles from './ReviewCart.module.scss';
import Avatar from '~/components/common/Avatar/Avatar';
import {AiFillStar} from 'react-icons/ai';
import clsx from 'clsx';

function ReviewCart({avatarUser, nameUser, numberStar, content}: PropsReviewCart) {
	const arr = [1, 2, 3, 4, 5];
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<Avatar src={avatarUser} className={styles.avatar} />
				<div>
					<p className={styles.name}>{nameUser}</p>
					<div className={styles.list_star}>
						{arr.map((v) => (
							<div
								key={v}
								className={clsx(styles.icon_star, {
									[styles.star_active]: v <= numberStar,
								})}
							>
								<AiFillStar size={24} />
							</div>
						))}
					</div>
				</div>
			</div>
			<p className={styles.content}>{content}</p>
		</div>
	);
}

export default ReviewCart;
