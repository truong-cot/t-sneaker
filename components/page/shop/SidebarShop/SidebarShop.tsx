import React, {useEffect, useState} from 'react';
import {ICategory, IStatus, PropsSidebarShop} from './interfaces';

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

function SidebarShop({}: PropsSidebarShop) {
	const router = useRouter();

	const {_category, _status} = router.query;

	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [listCateory, setListCateory] = useState<ICategory[]>([]);
	const [listStatus, setListStatus] = useState<IStatus[]>([]);

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
			]).then(([category, status]) => {
				if (category) {
					setListCateory(category.items);
				}
				if (status) {
					setListStatus(status?.items);
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
			{/* <div className={styles.price}>
				<h4 className={styles.title}>Giá sản phẩm</h4>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='radio'
						id='price_1'
						name='price'
						value='all'
						checked={valueRadio == 'all'}
						onChange={handleRadioChange}
					/>
					<label className={styles.label} htmlFor='price_1'>
						Tất cả
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='radio'
						id='price_2'
						name='price'
						value='price 1'
						checked={valueRadio == 'price 1'}
						onChange={handleRadioChange}
					/>
					<label className={styles.label} htmlFor='price_2'>
						Dưới {convertCoin(1000000)}đ
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='radio'
						id='price_3'
						name='price'
						value='price 2'
						checked={valueRadio == 'price 2'}
						onChange={handleRadioChange}
					/>
					<label className={styles.label} htmlFor='price_3'>
						{convertCoin(1000000)}đ - {convertCoin(3000000)}đ
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='radio'
						id='price_4'
						name='price'
						value='price 3'
						checked={valueRadio == 'price 3'}
						onChange={handleRadioChange}
					/>
					<label className={styles.label} htmlFor='price_4'>
						Trên {convertCoin(3000000)}đ
					</label>
				</div>
			</div> */}
		</div>
	);
}

export default SidebarShop;
