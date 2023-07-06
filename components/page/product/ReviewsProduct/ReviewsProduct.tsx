import React from 'react';
import {PropsReviewsProduct} from './interfaces';

import styles from './ReviewsProduct.module.scss';
import clsx from 'clsx';
import {AiFillStar} from 'react-icons/ai';
import ReviewCart from '../ReviewCart';
import {TbLoader} from 'react-icons/tb';

function ReviewsProduct({}: PropsReviewsProduct) {
	const arr = [1, 2, 3, 4, 5];

	return (
		<div className={styles.container}>
			<div className={styles.line}></div>
			<h4 className={styles.title}>Đánh giá sản phẩm</h4>
			<div className={styles.overview}>
				<h4 className={styles.number}>4.5</h4>
				<div className={styles.line_1}></div>
				<div className={styles.list_star}>
					{arr.map((v) => (
						<div
							key={v}
							className={clsx(styles.icon_star, {
								[styles.star_active]: true,
							})}
						>
							<AiFillStar size={28} />
						</div>
					))}
					<p className={styles.number_star}>120 Đánh giá</p>
				</div>
			</div>
			<div className={styles.main}>
				<ReviewCart />
				<ReviewCart />
				<ReviewCart />
			</div>
			<div className={styles.see_more}>
				<div className={styles.btn}>
					<p className={styles.text_btn}>Xem thêm 10 đánh giá</p>
					{/* <div className={styles.load}>
						<TbLoader color='#b255fb' />
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default ReviewsProduct;
