import React, {useContext, useMemo, useState} from 'react';
import {PropsCartItem} from './interfaces';

import styles from './CartItem.module.scss';
import {Trash} from 'iconsax-react';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import {convertCoin} from '~/common/func/convertCoin';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import clsx from 'clsx';
import Link from 'next/link';
import {ContextCart} from '../context';
import {TypeCart} from '~/constants/mocks/data';

function CartItem({data, plusNumber, minusNumber, deleteCart}: PropsCartItem) {
	// Gọi context
	const context = useContext<any>(ContextCart);

	// Tính giá theo giá gốc và khuyến mãi
	const priceSale = useMemo(() => {
		return data.unitPrice - data.unitPrice * (data.sale / 100);
	}, [data]);

	// Tính thành tiền theo giá đã khuyến mãi và số lượng
	const totalPrice = useMemo(() => {
		return priceSale * data?.qlt;
	}, [data]);

	// Hàm chọn sản phẩm vào giỏ hàng
	const chosseCart = (item: TypeCart) => {
		const isHave = context?.listCart?.some((v: any) => v.id == item.id);

		if (!isHave) {
			context.setListCart((prev: any) => [...prev, {...item}]);
		} else {
			context.setListCart((prev: any) =>
				prev.filter((v: any) => v.id != item.id)
			);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.item}>
					<input
						className={styles.checkbox}
						type='checkbox'
						onChange={() => null}
						defaultChecked={false}
						onClick={() => chosseCart(data)}
						checked={context?.listCart?.some(
							(v: any) => v.id == data.id
						)}
					/>
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
						{convertCoin(data?.unitPrice)}đ
					</p>
					<p className={styles.text}>{convertCoin(priceSale)}đ</p>
				</div>
				<div className={styles.box_size}>
					<p className={styles.text}>{data.size}</p>
				</div>
				<div className={styles.quantity}>
					<div
						onClick={() => minusNumber(data.id)}
						className={clsx(styles.quantity_item, {
							[styles.disabled]: data?.qlt == 1,
						})}
					>
						<AiOutlineMinus color='#00000' size={16} />
					</div>
					<div className={clsx(styles.qlt)}>{data?.qlt}</div>
					<div
						onClick={() => plusNumber(data.id)}
						className={clsx(styles.quantity_item, {
							[styles.disabled]: data?.qlt == 10,
						})}
					>
						<AiOutlinePlus color='#00000' size={16} />
					</div>
				</div>

				<p className={styles.price}>{convertCoin(totalPrice)}đ</p>
				<div>
					<div
						className={styles.icon}
						onClick={() => deleteCart(data.id)}
					>
						<Trash className={styles.trash} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItem;
