import React, {useMemo, useState} from 'react';
import {AiOutlineFullscreen} from 'react-icons/ai';
import {TbNumbers} from 'react-icons/tb';

import {PropsItemCart} from './interfaces';
import styles from './ItemCart.module.scss';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import {Trash} from 'iconsax-react';
import Dialog from '~/components/controls/Dialog/Dialog';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toastWarn} from '~/common/func/toast';
import {httpRequest} from '~/services';
import LoadingScreen from '~/components/protected/LoadingScreen';
import cartServices from '~/services/cartServices';

function ItemCart({data}: PropsItemCart) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);

	const [cartId, setCartId] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [openDeteleCart, setOpenDeleteCart] = useState<boolean>(false);

	const priceCart = useMemo(() => {
		const priceSale = (data?.productId?.price * data?.productId?.sale) / 100;

		const price = data?.productId?.price - priceSale;

		return price * data?.quality;
	}, [data]);

	const handleDeleteCart = (cartId: string) => {
		if (!token) {
			return toastWarn({msg: 'Bạn chưa đăng nhập!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: cartServices.deleteCart({
				token: token!,
				cartId: cartId,
			}),
		}).then((data) => {
			if (data) {
				router.replace(router.asPath, undefined, {scroll: false});
			}
		});
	};

	return (
		<>
			<div className={styles.container}>
				<LoadingScreen isLoading={loading} />
				<div className={styles.top}>
					<div className={styles.box_image}>
						<ImageFill src={data?.productId?.images?.[0]} fullHeight className={styles.image} />
					</div>
					<div className={styles.content}>
						<h4 className={styles.name}>{data?.productId?.name}</h4>
						<div className={styles.item}>
							<div className={styles.icon}>
								<AiOutlineFullscreen color='#788a9b' size={20} />
							</div>
							<p className={styles.text}>
								Kích cỡ: <span>{data?.sizeId?.size}</span>
							</p>
						</div>
						<div className={styles.item}>
							<div className={styles.icon}>
								<TbNumbers color='#788a9b' size={22} />
							</div>
							<p className={styles.text}>
								Số lượng: <span>{data?.quality}</span>
							</p>
						</div>
					</div>
				</div>
				<div className={styles.bottom}>
					<div className={styles.box_price}>
						<p className={styles.text_price}>Thành giá:</p>
						<p className={styles.price}>{convertCoin(priceCart)}đ</p>
					</div>
					<div className={styles.control}>
						<div
							className={styles.clear}
							onClick={() => {
								setCartId(data?._id);
								setOpenDeleteCart(true);
							}}
						>
							<Trash size={20} className={styles.trash} />
						</div>
						<Button href={`/product/${data?.productId?._id}`} primary p_6_12 rounded_20>
							Xem chi tiết
						</Button>
					</div>
				</div>
			</div>

			{/* Popup */}
			<Dialog
				open={openDeteleCart}
				onClose={() => setOpenDeleteCart(false)}
				onSubmit={() => handleDeleteCart(cartId)}
				title='Xóa đơn hàng'
				note='Bạn có chắc chắn muốn xóa đơn hàng này khỏi giỏ hàng?'
			/>
		</>
	);
}

export default ItemCart;
