import React, {useMemo} from 'react';
import {PropsCartProduct} from './interfaces';
import {MdReviews} from 'react-icons/md';

import styles from './CartProduct.module.scss';
import ImageFill from '../ImageFill/ImageFill';
import {AiFillStar} from 'react-icons/ai';
import {DollarCircle, Task} from 'iconsax-react';
import {convertCoin} from '~/common/func/convertCoin';
import Link from 'next/link';

function CartProduct({data}: PropsCartProduct) {
	const price = useMemo(() => {
		return data?.price - (data?.price * data?.sale) / 100;
	}, [data]);

	return (
		<Link href={`/product/${data?._id}`} className={styles.container}>
			<div className={styles.box_image}>
				<ImageFill src={data?.images[0]} className={styles.image} />
			</div>

			<div className={styles.content}>
				<h5 className={styles.name}>{data?.name}</h5>
				<div className={styles.review}>
					<div className={styles.icon}>
						<MdReviews color='#83BF6E' size={20} />
					</div>
					<p className={styles.text_review} style={{color: '#FE9214'}}>
						{data?.numberReview}
					</p>
					<div className={styles.icon}>
						<AiFillStar color='#EBAB07' size={20} />
					</div>
					<p className={styles.text_review} style={{color: '#83BF6E'}}>
						{data?.averageRating}
					</p>
				</div>
				<div className={styles.times_sold}>
					<div className={styles.icon}>
						<Task size={18} color='#8496AC' />
					</div>
					<p className={styles.text_review} style={{color: '#8496AC'}}>
						Số lượt đã bán: <span style={{color: '#D5444A'}}>{data?.quantitySold}</span>
					</p>
				</div>
				<div className={styles.list_price}>
					<div className={styles.icon}>
						<DollarCircle size={20} color='#8496AC' />
					</div>
					<h4 className={styles.price}>
						Giá tiền:{' '}
						{data?.sale > 0 ? (
							<>
								<span className={styles.price_1}>{convertCoin(data?.price)}đ</span> -{' '}
								<span className={styles.price_2}>{convertCoin(price)}đ</span>
							</>
						) : (
							<span className={styles.price_2}>{convertCoin(data?.price)}đ</span>
						)}
					</h4>
				</div>
			</div>

			<div className={styles.list_status}>
				{data?.sale > 0 ? (
					<div className={styles.sale}>
						<p className={styles.text_sale}>{data?.sale}%</p>
					</div>
				) : null}
			</div>
		</Link>
	);
}

export default CartProduct;
