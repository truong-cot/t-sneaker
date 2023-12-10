import React, {useEffect, useState} from 'react';
import {IDateEvaluate, PropsReviewsProduct} from './interfaces';

import styles from './ReviewsProduct.module.scss';
import clsx from 'clsx';
import {AiFillStar} from 'react-icons/ai';
import ReviewCart from '../ReviewCart';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import evaluateServices from '~/services/evaluateServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import icons from '~/constants/images/icons';

function ReviewsProduct({}: PropsReviewsProduct) {
	const arr = [1, 2, 3, 4, 5];

	const router = useRouter();

	const {id_product} = router.query;
	const {token} = useSelector((state: RootState) => state.auth);
	const [dataReviews, setDataReviews] = useState<IDateEvaluate>({
		count: 0,
		averageRating: '',
		items: [],
	});
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (id_product) {
			httpRequest({
				setLoading: setLoading,
				http: evaluateServices.getEvaluateByProduct({
					token: token!,
					productId: id_product as string,
					limit: null,
					page: null,
				}),
			}).then((data) => {
				if (data) {
					setDataReviews(data);
				}
			});
		}
	}, [token, id_product]);

	return (
		<div className={styles.container}>
			<div className={styles.line}></div>
			<h4 className={styles.title}>Đánh giá sản phẩm</h4>
			<div className={styles.overview}>
				<h4 className={styles.number}>{dataReviews?.averageRating}</h4>
				<div className={styles.line_1}></div>
				<div className={styles.list_star}>
					{arr.map((v) => (
						<div
							key={v}
							className={clsx(styles.icon_star, {
								[styles.star_active]: Number(dataReviews?.averageRating),
							})}
						>
							<AiFillStar size={28} />
						</div>
					))}
					<p className={styles.number_star}>
						<span>{dataReviews?.count}</span> Đánh giá
					</p>
				</div>
			</div>
			<div className={styles.main}>
				<DataWrapper
					data={dataReviews?.items}
					loading={loading}
					noti={
						<Noti
							disableButton
							title='Đánh giá trống!'
							des='Hiện tại chưa có đánh giá nào!'
							img={icons.NoItemsCart_removebg}
						/>
					}
				>
					{dataReviews?.items?.map((v) => (
						<ReviewCart
							key={v?._id}
							avatarUser={v?.user?.avatar!}
							nameUser={v?.user?.fullname}
							content={v?.content}
							numberStar={v?.numberStar}
						/>
					))}
				</DataWrapper>
			</div>
		</div>
	);
}

export default ReviewsProduct;
