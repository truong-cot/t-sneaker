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
import ListImage from '~/components/controls/ListImage';
import DescriptionProduct from '../DescriptionProduct';
import ReviewsProduct from '../ReviewsProduct';
import MayLikeProduct from '../MayLikeProduct';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import productServices from '~/services/productServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import cartServices from '~/services/cartServices';
import {toastText, toastWarn} from '~/common/func/toast';
import LoadingScreen from '~/components/protected/LoadingScreen';
import {signJWT} from '~/common/func/jwt';
import {DISCOUNT_MONEY, MONEY_CART} from '~/constants/mocks/enum';

function MainProduct({}: PropsMainProduct) {
	const router = useRouter();

	const {id_product} = router.query;
	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [data, setData] = useState<IData>();
	const [quality, setQuality] = useState<number>(1);

	const [sizeId, setSizeId] = useState<string>('');
	const [care, setCare] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const arr = [1, 2, 3, 4, 5];

	const plusNumber = () => {
		if (quality <= 10) {
			setQuality(quality + 1);
		}
	};

	const minusNumber = () => {
		if (quality >= 1) {
			setQuality(quality - 1);
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

		return 0;
	}, [data]);

	const totalPriceCart = useMemo(() => {
		return price * quality;
	}, [price, quality]);

	const discount = useMemo(() => {
		if (totalPriceCart == 0) {
			return 0;
		}

		if (totalPriceCart > MONEY_CART.MONEY_50 && totalPriceCart < MONEY_CART.MONEY_150) {
			return DISCOUNT_MONEY.DISCOUNT_01;
		}

		if (totalPriceCart >= MONEY_CART.MONEY_150 && totalPriceCart < MONEY_CART.MONEY_300) {
			return DISCOUNT_MONEY.DISCOUNT_02;
		}

		if (totalPriceCart >= MONEY_CART.MONEY_300) {
			return DISCOUNT_MONEY.DISCOUNT_03;
		}

		return 0;
	}, [totalPriceCart]);

	const dataCart = useMemo(() => {
		return [
			{
				userId: infoUser?._id as string,
				productId: {
					_id: id_product as string,
					images: data?.images || [],
					name: data?.name || '',
					price: data?.price || 0,
					sale: data?.sale || 0,
				},
				quality: quality,
				sizeId: {
					_id: sizeId,
					size: data?.sizes?.find((v) => v?.sizeId?._id == sizeId)?.sizeId?.size || 0,
					description: data?.sizes?.find((v) => v?.sizeId?._id == sizeId)?.sizeId?.description || '',
				},
				_id: null,
				createdAt: '',
				updatedAt: '',
			},
		];
	}, [data, quality, sizeId, infoUser, id_product]);

	// Hàm xử lý mua sản phẩm
	const handleSubmit = () => {
		if (!token) {
			return toastWarn({msg: 'Vui lòng đăng nhập vào hệ thống!'});
		}

		if (!sizeId) {
			return toastText({msg: 'Vui lòng chọn size!'});
		}

		const dataSubmit = signJWT({
			discount: discount,
			listProduct: dataCart,
			totalPriceCart: totalPriceCart,
		});
		router.push(`/payment?cart=${dataSubmit}`, undefined);
	};

	const handleAddToCart = () => {
		if (!token) {
			return toastWarn({msg: 'Bạn chưa đăng nhập!'});
		}

		if (!sizeId) {
			return toastText({msg: 'Vui lòng chọn size!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: cartServices.createCart({
				token: token!,
				productId: id_product as string,
				userId: infoUser?._id as string,
				sizeId: sizeId,
				quality: quality,
			}),
		}).then((data) => {
			if (data) {
				setQuality(1);
				setSizeId('');
				router.replace(router.asPath, undefined, {scroll: false});
			}
		});
	};

	return (
		<div className={styles.container}>
			<LoadingScreen isLoading={loading} />

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
									onClick={() => setSizeId(v?.sizeId?._id)}
									className={clsx(styles.size, {
										[styles.active]: v?.sizeId?._id == sizeId,
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
									[styles.disabled]: quality == 1,
								})}
							>
								<AiOutlineMinus color='#00000' size={18} />
							</div>
							<div className={clsx(styles.qlt)}>{quality}</div>
							<div
								onClick={plusNumber}
								className={clsx(styles.quantity_item, {
									[styles.disabled]: quality == 10,
								})}
							>
								<AiOutlinePlus color='#00000' size={18} />
							</div>
						</div>
					</div>

					<div className={styles.box_btn}>
						<Button purple bold onClick={handleAddToCart}>
							Thêm vào giỏ hàng
						</Button>
						<Button bright_red bold onClick={handleSubmit}>
							Mua ngay
						</Button>
						{/* <div className={styles.box_like} onClick={() => setCare(!care)}>
							{care ? (
								<BsSuitHeart size={18} color='#EE1212' />
							) : (
								<BsSuitHeartFill size={18} color='#EE1212' />
							)}
						</div> */}
					</div>
				</div>
				<ContactShop />
			</div>
			<DescriptionProduct des={data?.detailDescription || ''} />
			<ReviewsProduct />
			<MayLikeProduct _category={data?.categoryId?._id || ''} />
		</div>
	);
}

export default MainProduct;
