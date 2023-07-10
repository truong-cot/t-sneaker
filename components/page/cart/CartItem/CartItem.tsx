import React, {useMemo, useState} from 'react';
import {PropsCartItem} from './interfaces';

import styles from './CartItem.module.scss';
import {Trash} from 'iconsax-react';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import {convertCoin} from '~/common/func/convertCoin';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import clsx from 'clsx';
import Link from 'next/link';

function CartItem({data, plusNumber}: PropsCartItem) {
	// Tính giá theo giá gốc và khuyến mãi
	const priceSale = useMemo(() => {
		return data.price - data.price * (data.sale / 100);
	}, [data]);

	// Tính thành tiền theo giá đã khuyến mãi và số lượng
	const totalPrice = useMemo(() => {
		return priceSale * data?.qlt;
	}, [data]);

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.item}>
					<input className={styles.checkbox} type='checkbox' />
					<div className={styles.info}>
						<div className={styles.box_image}>
							<ImageFill
								fullHeight
								className={styles.image}
								src={data?.image}
							/>
						</div>
						<Link href={'/product/123'} className={styles.name}>
							{data?.name}
						</Link>
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.box_price}>
					<p className={styles.text_sale}>
						{convertCoin(data?.price)}đ
					</p>
					<p className={styles.text}>{convertCoin(priceSale)}đ</p>
				</div>
				<div className={styles.quantity}>
					<div
						// onClick={minusNumber}
						className={clsx(styles.quantity_item, {
							[styles.disabled]: data?.qlt == 1,
						})}
					>
						<AiOutlineMinus color='#00000' size={16} />
					</div>
					<div className={clsx(styles.qlt)}>{data?.qlt}</div>
					<div
						onClick={() => plusNumber(data?.id)}
						className={clsx(styles.quantity_item, {
							[styles.disabled]: data?.qlt == 10,
						})}
					>
						<AiOutlinePlus color='#00000' size={16} />
					</div>
				</div>
				<p className={styles.price}>{convertCoin(totalPrice)}đ</p>
				<div>
					<div className={styles.icon}>
						<Trash className={styles.trash} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItem;
