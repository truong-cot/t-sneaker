import React from './ReviewCart.module.scss';
import {PropsReviewCart} from './interfaces';

import styles from './ReviewCart.module.scss';
import Avatar from '~/components/common/Avatar/Avatar';
import {AiFillStar} from 'react-icons/ai';
import clsx from 'clsx';

function ReviewCart({}: PropsReviewCart) {
	const arr = [1, 2, 3, 4, 5];
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<Avatar className={styles.avatar} />
				<div>
					<p className={styles.name}>Đặng Bá Trường</p>
					<div className={styles.list_star}>
						{arr.map((v) => (
							<div
								key={v}
								className={clsx(styles.icon_star, {
									[styles.star_active]: v < 5,
								})}
							>
								<AiFillStar size={24} />
							</div>
						))}
					</div>
				</div>
			</div>
			<p className={styles.content}>
				I love these... they are soooooo comfortable and I want these in
				lots of lots of colors. I have about 3 pairs now. I would
				recommend getting a pair if you do not have one already :-) :-)
				:-)
			</p>
		</div>
	);
}

export default ReviewCart;
