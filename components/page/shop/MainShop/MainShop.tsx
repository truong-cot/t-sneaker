import React, {useEffect, useRef, useState} from 'react';
import {PropsMainShop} from './interfaces';

import styles from './MainShop.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import SidebarShop from '../SidebarShop';
import ArrangeShow from '../ArrangeShow';
import LoadingData from '~/components/protected/LoadingData';
import GridColumn from '~/components/layouts/GridColumn';
import CartProduct from '~/components/common/CartProduct';
import SkeletonLoading from '~/components/common/SkeletonLoading';
import SkeletonCardProduct from '~/components/common/SkeletonCardProduct';
import {httpRequest} from '~/services';
import productServices from '~/services/productServices';

function MainShop({}: PropsMainShop) {
	const [page, setPage] = useState(1);
	const loaderRef = useRef(null);

	// Xử lý khi loaderRef xuất hiện
	const handleObserver = (entries: any) => {
		const target = entries[0];

		// Xử lý sự kiện khi loaderRef xuất hiện trên màn hình
		if (target.isIntersecting) {
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(handleObserver, {
			root: null, // Kiểm tra sự xuất hiện trong viewport
			rootMargin: '-100px', // Không áp dụng margin thêm vào viewport
			threshold: 1, // Khi phần trăm hiển thị của loaderRef đạt 10%
		});

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, []);

	// Call api
	useEffect(() => {
		httpRequest({
			http: productServices.getAllProduct({
				page: 1,
				limit: 10,
				keyWord: '',
				categoryUuids: ['1'],
				pricePrev: 0,
				priceNext: 10000000,
				status: [1],
				sortBy: {
					type: 1,
					sort: true,
				},
			}),
		}).then((data) => {
			if (data) {
				console.log(data);
			}
		});
	}, []);

	return (
		<div className={styles.container}>
			<Breadcrumb titles={['Trang chủ', 'Cửa hàng']} listHref={['/']} />
			<div className={styles.main}>
				<SidebarShop />
				<div className={styles.content}>
					<ArrangeShow />
					<div className={styles.list}>
						<LoadingData
							isLoading={false}
							load={
								<GridColumn col_4>
									<SkeletonLoading
										Item={SkeletonCardProduct}
										count={8}
									/>
								</GridColumn>
							}
						>
							<GridColumn col_3>
								<CartProduct />
								<CartProduct />
								<CartProduct />
								<CartProduct />
								<CartProduct />
								<CartProduct />
								<CartProduct />
								<CartProduct />
								<CartProduct />
							</GridColumn>
						</LoadingData>
					</div>
					<div ref={loaderRef}></div>
				</div>
			</div>
		</div>
	);
}

export default MainShop;
