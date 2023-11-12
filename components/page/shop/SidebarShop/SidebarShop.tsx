import React, {useEffect, useState} from 'react';
import {ICategory, IPrice, IStatus, PropsSidebarShop} from './interfaces';

import styles from './SidebarShop.module.scss';
import {convertCoin} from '~/common/func/convertCoin';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import categoryServices from '~/services/categoryServices';
import SkeletonLoading from '~/components/common/SkeletonLoading';
import SkeletonCategoryFilter from '../SkeletonCategoryFilter';
import statusServices from '~/services/statusServices';
import priceServices from '~/services/priceServices';

function SidebarShop({}: PropsSidebarShop) {
	const router = useRouter();

	const {_category, _status, _priceFrom, _priceTo} = router.query;

	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [listCateory, setListCateory] = useState<ICategory[]>([]);
	const [listStatus, setListStatus] = useState<IStatus[]>([]);
	const [listPrice, setListPrice] = useState<IPrice[]>([]);

	useEffect(() => {
		(async () => {
			Promise.all([
				// Lấy danh sách thể loại
				httpRequest({
					setLoading,
					http: categoryServices.getList({
						page: null,
						limit: null,
						keyword: '',
						token: token!,
					}),
				}),
				// Lấy danh sách trạng thái
				httpRequest({
					setLoading,
					http: statusServices.getList({
						page: null,
						limit: null,
						keyword: '',
						token: token!,
					}),
				}),
				// Lấy danh sách khoảng giá
				httpRequest({
					setLoading,
					http: priceServices.getList({
						page: null,
						limit: null,
						token: token!,
					}),
				}),
			]).then(([category, status, price]) => {
				if (category) {
					setListCateory(category.items);
				}
				if (status) {
					setListStatus(status?.items);
				}
				if (price) {
					setListPrice(price?.items);
				}
			});
		})();
	}, [token]);

	// Hàm set value category param
	const handleSetValueParam = (key: string, value: string | null) => {
		const {[key]: str, ...rest} = router.query;

		if (value == null) {
			return router.replace(
				{
					query: {
						...rest,
					},
				},
				undefined,
				{
					scroll: false,
				}
			);
		}

		return router.replace(
			{
				query: {
					...router.query,
					[key]: value,
				},
			},
			undefined,
			{
				scroll: false,
			}
		);
	};

	const setParamPrice = (from: number | null, to: number | null) => {
		const {_priceFrom, _priceTo, ...rest} = router.query;

		if (from == null && to == null) {
			return router.replace(
				{
					query: {
						...rest,
					},
				},
				undefined,
				{
					scroll: false,
				}
			);
		}

		return router.replace(
			{
				query: {
					...router.query,
					_priceFrom: from,
					_priceTo: to,
				},
			},
			undefined,
			{
				scroll: false,
			}
		);
	};

	return (
		<div className={styles.container}>
			{/* Danh mục sản phẩm */}
			<h4 className={styles.title}>Danh mục sản phẩm</h4>
			<div className={styles.list_category}>
				{loading ? (
					<SkeletonLoading Item={SkeletonCategoryFilter} count={4} />
				) : (
					<>
						<div className={styles.item_category}>
							<input
								className={styles.checkbox}
								type='checkbox'
								id='category'
								name='category'
								value='category all'
								onChange={() => null}
								checked={_category == null}
								onClick={() => handleSetValueParam('_category', null)}
							/>
							<label className={styles.label} htmlFor='category'>
								Tất cả
							</label>
						</div>
						{listCateory.map((v) => (
							<div key={v._id} className={styles.item_category}>
								<input
									className={styles.checkbox}
									type='checkbox'
									id={v.name}
									name='category'
									value={v._id}
									onChange={() => null}
									checked={_category == v._id}
									onClick={() => handleSetValueParam('_category', v._id)}
								/>
								<label className={styles.label} htmlFor={v.name}>
									{v.name}
								</label>
							</div>
						))}
					</>
				)}
			</div>

			{/* Trạng thái sản phẩm */}
			<div className={styles.price}>
				<h4 className={styles.title}>Trạng thái sản phẩm</h4>
				{loading ? (
					<SkeletonLoading Item={SkeletonCategoryFilter} count={4} />
				) : (
					<>
						<div className={styles.item_category}>
							<input
								className={styles.checkbox}
								type='checkbox'
								id='status'
								name='status'
								value='status all'
								onChange={() => null}
								checked={_status == null}
								onClick={() => handleSetValueParam('_status', null)}
							/>
							<label className={styles.label} htmlFor='status'>
								Tất cả
							</label>
						</div>
						{listStatus.map((v) => (
							<div key={v._id} className={styles.item_category}>
								<input
									className={styles.checkbox}
									type='checkbox'
									id={v._id}
									name='status'
									value={v._id}
									onChange={() => null}
									checked={_status == v._id}
									onClick={() => handleSetValueParam('_status', v._id)}
								/>
								<label className={styles.label} htmlFor={v._id}>
									{v.name}
								</label>
							</div>
						))}
					</>
				)}
			</div>

			{/* Giá sản phẩm */}
			<div className={styles.price}>
				<h4 className={styles.title}>Giá sản phẩm</h4>
				{loading ? (
					<SkeletonLoading Item={SkeletonCategoryFilter} count={4} />
				) : (
					<>
						<div className={styles.item_category}>
							<input
								className={styles.checkbox}
								type='checkbox'
								id='price'
								name='price'
								value='price all'
								onChange={() => null}
								checked={_priceFrom == null && _priceTo == null}
								onClick={() => setParamPrice(null, null)}
							/>
							<label className={styles.label} htmlFor='price'>
								Tất cả
							</label>
						</div>

						{listPrice.map((v) => (
							<div key={v._id} className={styles.item_category}>
								<input
									className={styles.checkbox}
									type='checkbox'
									id={v._id}
									name='status'
									value={v._id}
									onChange={() => null}
									checked={Number(_priceFrom) == v.priceFrom && Number(_priceTo) == v.priceTo}
									onClick={() => setParamPrice(v.priceFrom, v.priceTo)}
								/>
								<label className={styles.label} htmlFor={v._id}>
									{v.priceFrom} VND - {v.priceTo} VND
								</label>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default SidebarShop;
