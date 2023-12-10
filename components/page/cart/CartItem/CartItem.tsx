import React, {useContext, useMemo} from 'react';
import {PropsCartItem} from './interfaces';

import styles from './CartItem.module.scss';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import {convertCoin} from '~/common/func/convertCoin';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import clsx from 'clsx';
import Link from 'next/link';
import {ContextCart, TypeContext} from '../context';
import {TypeCart} from '~/constants/mocks/data';
import {ICart} from '../MainListCart/interfaces';

function CartItem({data, plusNumber, minusNumber}: PropsCartItem) {
	// Gọi context
	const context = useContext<TypeContext>(ContextCart);

	// Tính giá theo giá gốc và khuyến mãi
	const totalPrice = useMemo(() => {
		const priceSale = (data?.productId?.price * data?.productId?.sale) / 100;

		const price = data?.productId?.price - priceSale;

		return price * data?.quality;
	}, [data]);

	// Tính giá đã sale
	const priceSale = useMemo(() => {
		const priceSale = (data?.productId?.price * data?.productId?.sale) / 100;

		const price = data?.productId?.price - priceSale;

		return price;
	}, [data]);

	// Hàm chọn sản phẩm vào giỏ hàng
	const chosseCart = (item: ICart) => {
		const isHave = context?.listCart?.some((v) => v._id == item._id);

		if (!isHave) {
			context.setListCart((prev: any) => [...prev, {...item}]);
		} else {
			context.setListCart((prev: any) => prev.filter((v: any) => v._id != item._id));
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.left}>
					<div className={styles.item}>
						<input
							className={styles.checkbox}
							type='checkbox'
							onChange={() => null}
							defaultChecked={false}
							onClick={() => chosseCart(data)}
							checked={context?.listCart?.some((v) => v._id == data._id)}
						/>
						<div className={styles.info}>
							<div className={styles.box_image}>
								<ImageFill fullHeight className={styles.image} src={data?.productId?.images?.[0]} />
							</div>
							<Link href={'/product/123'} className={styles.name}>
								{data?.productId?.name}
							</Link>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.box_price}>
						<p className={styles.text_sale}>{convertCoin(data?.productId?.price)}đ</p>
						<p className={styles.text}>{convertCoin(priceSale)}đ</p>
					</div>
					<div className={styles.box_size}>
						<p className={styles.text}>{data?.sizeId?.size}</p>
					</div>
					<div className={styles.quantity}>
						<div
							onClick={() => minusNumber(data._id)}
							className={clsx(styles.quantity_item, {
								[styles.disabled]: data?.quality == 1,
							})}
						>
							<AiOutlineMinus color='#00000' size={16} />
						</div>
						<div className={clsx(styles.qlt)}>{data?.quality}</div>
						<div
							onClick={() => plusNumber(data._id)}
							className={clsx(styles.quantity_item, {
								[styles.disabled]: data?.quality == 10,
							})}
						>
							<AiOutlinePlus color='#00000' size={16} />
						</div>
					</div>

					<p className={styles.price}>{convertCoin(totalPrice)}đ</p>
				</div>
			</div>
		</>
	);
}

export default CartItem;
