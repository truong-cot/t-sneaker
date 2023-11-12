import React, {useEffect, useMemo, useState} from 'react';

import {IData, PropsMainProduct} from './interfaces';
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
import {httpRequest} from '~/services';
import productServices from '~/services/productServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function MainProduct({}: PropsMainProduct) {
	const router = useRouter();

	const {id_product} = router.query;
	const {token} = useSelector((state: RootState) => state.auth);

	const [data, setData] = useState<IData>();
	const [size, setSize] = useState<number>(0);
	const [number, setNumber] = useState<number>(1);
	const [care, setCare] = useState<boolean>(false);

	const arr = [1, 2, 3, 4, 5];

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

	// Call api
	useEffect(() => {
		if (id_product) {
			httpRequest({
				http: productServices.getDetail({
					token: token!,
					idProduct: id_product as string,
				}),
			}).then((data) => {
				if (data) {
					setData(data);
				}
			});
		}
	}, [token, id_product]);

	const splitImages = useMemo(() => {
		if (data) {
			const [, ...rest] = data?.images;

			return rest;
		} else return [];
	}, [data]);

	const price = useMemo(() => {
		if (data) {
			return data?.price - (data?.price * data?.sale) / 100;
		}
	}, [data]);

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
				titles={['Trang chủ', 'Cửa hàng', `${data?.categoryId?.name}`, `${data?.name}`]}
				listHref={['/', '/shop', `/shop?_category=${data?.categoryId?._id}`]}
			/>
			<div className={styles.main}>
				<div className={styles.box_1}>
					<ImageFill fullHeight className={styles.image} src={data?.images[0]} />
					<ListImage max={4} width={80} height={80} borderRadius={8} images={splitImages} />
				</div>
				<div className={styles.box_2}>
					<h4 className={styles.name_product}>{data?.name}</h4>
					<div className={styles.list_star}>
						{arr.map((v) => (
							<div
								key={v}
								className={clsx(styles.icon_star, {
									[styles.star_active]:
										v <= Math.floor(data?.averageRating ? data?.averageRating : 0),
								})}
							>
								<AiFillStar size={24} />
							</div>
						))}
						<p className={styles.number_star}>{data?.averageRating}</p>
					</div>
					<div className={styles.list_price}>
						<div className={styles.icon}>
							<DollarCircle size={22} color='#8496AC' />
						</div>
						<h4 className={styles.price}>
							Giá tiền:{' '}
							{data?.sale || 0 > 0 ? (
								<>
									<span className={styles.price_1}>{convertCoin(data?.price || 0)}đ</span> -{' '}
									<span className={styles.price_2}>{convertCoin(price || 0)}đ</span>
								</>
							) : (
								<span className={styles.price_2}>{convertCoin(data?.price || 0)}đ</span>
							)}
						</h4>
					</div>
					<p className={styles.main_des}>{data?.mainDescription}</p>

					<div className={styles.box_size}>
						<h4 className={styles.title_size}>Lựa chọn kích cỡ</h4>
						<div className={styles.list_size}>
							{data?.sizes?.map((v) => (
								<div
									key={v?._id}
									onClick={() => setSize(v?.sizeId?.size)}
									className={clsx(styles.size, {
										[styles.active]: v?.sizeId?.size == size,
										[styles.disabled]: v?.quantity == 0,
									})}
								>
									<p>{v?.sizeId?.size}</p>
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
						<div className={styles.box_like} onClick={() => setCare(!care)}>
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
			<DescriptionProduct des={data?.detailDescription || ''} />
			<ReviewsProduct />
			<MayLikeProduct />
		</div>
	);
}

export default MainProduct;
