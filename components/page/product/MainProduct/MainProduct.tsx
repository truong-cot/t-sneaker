import React, {useState} from 'react';

import {PropsMainProduct} from './interfaces';
import styles from './MainProduct.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import ContactShop from '../ContactShop';
import clsx from 'clsx';
import {AiFillStar, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import {DollarCircle} from 'iconsax-react';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import {TbLoader} from 'react-icons/tb';
import ListImage from '~/components/controls/ListImage';
import DescriptionProduct from '../DescriptionProduct';
import ReviewsProduct from '../ReviewsProduct';
import MayLikeProduct from '../MayLikeProduct';
import {signJWT} from '~/common/func/jwt';
import {useRouter} from 'next/router';

function MainProduct({}: PropsMainProduct) {
	const router = useRouter();

	const [size, setSize] = useState<number>(0);
	const [number, setNumber] = useState<number>(1);
	const [care, setCare] = useState<boolean>(false);

	const arr = [1, 2, 3, 4, 5];
	const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44];

	const plusNumber = () => {
		if (number <= 10) {
			setNumber(number + 1);
		}
	};

	const minusNumber = () => {
		if (number >= 1) {
			setNumber(number - 1);
		}
	};

	// Hàm xử lý mua sản phẩm
	// Hàm submit
	const handleSubmit = () => {
		// if (context.listCart.length > 0) {
		// const dataSubmit = signJWT({
		// 	listProduct: listCart,
		// 	temporaryPrice: totalPriceChosseCart,
		// 	freeShipping: priceShipping,
		// });
		// router.push(`/payment?cart=${dataSubmit}`, undefined);
		// } else {
		// 	return toastWarn({msg: 'Vui lòng chọn sản phẩm để thanh toán!'});
		// }
	};

	return (
		<div className={styles.container}>
			<Breadcrumb
				titles={[
					'Trang chủ',
					'Cửa hàng',
					'Giày Nike',
					'Giày nike cổ cao',
				]}
				listHref={['/', '/shop', '/shop?category=category+1']}
			/>
			<div className={styles.main}>
				<div className={styles.box_1}>
					<ImageFill
						fullHeight
						className={styles.image}
						src='https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600'
					/>
					<ListImage
						max={4}
						width={80}
						height={80}
						borderRadius={8}
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
				<div className={styles.box_2}>
					<h4 className={styles.name_product}>
						Nike Jordan 1 Low Đen Trắng REP Nike Jordan 1 Low Đen
						Trắng REP Nike Jordan 1 Low Đen Trắng REP
					</h4>
					<div className={styles.list_star}>
						{arr.map((v) => (
							<div
								key={v}
								className={clsx(styles.icon_star, {
									[styles.star_active]: true,
								})}
							>
								<AiFillStar size={24} />
							</div>
						))}
						<p className={styles.number_star}>4.2</p>
					</div>
					<div className={styles.list_price}>
						<div className={styles.icon}>
							<DollarCircle size={22} color='#8496AC' />
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
					<p className={styles.main_des}>
						Áo kiểu bé gái YF màu trắng nhún eo đính chiếc dù với
						kiểu dáng tinh tế, ngực trái đính chiếc dù làm điểm nhấn
						mang đến cho bé sự thích thú và nét nhí nhảnh. Hơn thế,
						áo được may trên nền chất liệu Cotton thoáng mát, rút mồ
						hôi, giúp bé luôn thoải mái trong mọi hoạt động. hôi,
						giúp bé luôn thoải mái trong mọi hoạt động. hôi, giúp bé
						luôn thoải mái trong mọi hoạt động.
					</p>

					<div className={styles.box_size}>
						<h4 className={styles.title_size}>Lựa chọn kích cỡ</h4>
						<div className={styles.list_size}>
							{sizes.map((v) => (
								<div
									key={v}
									onClick={() => setSize(v)}
									className={clsx(styles.size, {
										[styles.active]: v == size,
										[styles.disabled]: false,
									})}
								>
									<p>{v}</p>
								</div>
							))}
						</div>
					</div>

					<div className={styles.box_size}>
						<h4 className={styles.title_size}>
							Số lượng: <span>(Số lượng tối đa 10 sản phẩm)</span>
						</h4>
						<div className={styles.quantity}>
							<div
								onClick={minusNumber}
								className={clsx(styles.quantity_item, {
									[styles.disabled]: number == 1,
								})}
							>
								<AiOutlineMinus color='#00000' size={18} />
							</div>
							<div className={clsx(styles.qlt)}>{number}</div>
							<div
								onClick={plusNumber}
								className={clsx(styles.quantity_item, {
									[styles.disabled]: number == 10,
								})}
							>
								<AiOutlinePlus color='#00000' size={18} />
							</div>
						</div>
					</div>

					<div className={styles.box_btn}>
						<Button purple bold>
							Thêm vào giỏ hàng
						</Button>
						<Button bright_red bold onClick={handleSubmit}>
							Mua ngay
						</Button>
						<div
							className={styles.box_like}
							onClick={() => setCare(!care)}
						>
							{care ? (
								<BsSuitHeart size={18} color='#EE1212' />
							) : (
								<BsSuitHeartFill size={18} color='#EE1212' />
							)}

							{/* <div className={styles.load}>
								<TbLoader color='#b255fb' />
							</div> */}
						</div>
					</div>
				</div>
				<ContactShop />
			</div>
			<DescriptionProduct />
			<ReviewsProduct />
			<MayLikeProduct />
		</div>
	);
}

export default MainProduct;
