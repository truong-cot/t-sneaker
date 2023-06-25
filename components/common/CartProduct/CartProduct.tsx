import React from 'react';
import {PropsCartProduct} from './interfaces';
import {MdReviews} from 'react-icons/md';

import styles from './CartProduct.module.scss';
import ImageFill from '../ImageFill/ImageFill';
import ListImage from '~/components/controls/ListImage';
import {AiFillStar} from 'react-icons/ai';
import {DollarCircle, Task} from 'iconsax-react';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button';

function CartProduct({}: PropsCartProduct) {
	return (
		<div className={styles.container}>
			<div className={styles.box_image}>
				<ImageFill
					src='https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600'
					className={styles.image}
				/>
			</div>
			<div className={styles.list_image}>
				<ListImage
					max={4}
					width={60}
					height={60}
					borderRadius={6}
					images={[
						'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
						'https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg?auto=compress&cs=tinysrgb&w=1600',
						'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
						'https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg?auto=compress&cs=tinysrgb&w=1600',
						'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
						'https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg?auto=compress&cs=tinysrgb&w=1600',
					]}
				/>
			</div>
			<div className={styles.content}>
				<h5 className={styles.name}>
					Giày Gucci Men’s Screener GG Sneaker Like Auth Giày Gucci
					Men’s Screener GG Sneaker Like Auth Like Auth Giày Gucci
					Men’s Screener GG Sneaker Like Auth
				</h5>
				<div className={styles.review}>
					<div className={styles.icon}>
						<MdReviews color='#83BF6E' size={20} />
					</div>
					<p
						className={styles.text_review}
						style={{color: '#FE9214'}}
					>
						20
					</p>
					<div className={styles.icon}>
						<AiFillStar color='#EBAB07' size={20} />
					</div>
					<p
						className={styles.text_review}
						style={{color: '#83BF6E'}}
					>
						20
					</p>
				</div>
				<div className={styles.times_sold}>
					<div className={styles.icon}>
						<Task size={18} color='#8496AC' />
					</div>
					<p
						className={styles.text_review}
						style={{color: '#8496AC'}}
					>
						Số lượt đã bán:{' '}
						<span style={{color: '#D5444A'}}>40</span>
					</p>
				</div>
				<div className={styles.list_price}>
					<div className={styles.icon}>
						<DollarCircle size={20} color='#8496AC' />
					</div>
					<h4 className={styles.price}>
						Giá tiền:{' '}
						<span className={styles.price_1}>
							{convertCoin(20000000)}đ
						</span>{' '}
						-{' '}
						<span className={styles.price_2}>
							{convertCoin(24000000)}đ
						</span>
					</h4>
				</div>
			</div>
			<div className={styles.bottom}>
				<Button primary_line>Thêm vào giỏ hàng</Button>
				<Button primary>Xem chi tiết</Button>
			</div>
			<div className={styles.new}>
				<p className={styles.text_sale}>NEW</p>
			</div>
			<div className={styles.sale}>
				<p className={styles.text_sale}>20%</p>
			</div>
		</div>
	);
}

export default CartProduct;
