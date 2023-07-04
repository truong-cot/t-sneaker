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

function MainShop({}: PropsMainShop) {
	const [page, setPage] = useState(1);
	const loaderRef = useRef(null);

	const handleObserver = (entries: any) => {
		const target = entries[0];

		if (target.isIntersecting) {
			fetchItems();
		}
	};

	const fetchItems = () => {
		setPage((prev) => prev + 1);
	};

	useEffect(() => {
		const observer = new IntersectionObserver(handleObserver, {
			threshold: 1, // Khi loaderRef trở nên hoàn toàn hiển thị
		});
		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}
	}, []);

	console.log(page);

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
