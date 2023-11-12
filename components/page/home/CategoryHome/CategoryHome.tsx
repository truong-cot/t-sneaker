import React, {useEffect, useState} from 'react';

import {ICategory, PropsCategoryHome} from './interfaces';
import styles from './CategoryHome.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';
import Link from 'next/link';
import ImageFill from '~/components/common/ImageFill';
import {httpRequest} from '~/services';
import categoryServices from '~/services/categoryServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import SkeletonLoading from '~/components/common/SkeletonLoading';
import SkeletonCategory from '../SkeletonCategory';

function CategoryHome({}: PropsCategoryHome) {
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [category, setCategory] = useState<ICategory[]>([]);

	useEffect(() => {
		httpRequest({
			setLoading,
			http: categoryServices.getList({
				page: null,
				limit: null,
				keyword: '',
				token: token!,
			}),
		}).then((data) => {
			if (data) {
				setCategory(data.items);
			}
		});
	}, [token]);

	return (
		<LayoutGrid>
			<div className={styles.container}>
				<h4 className={styles.title}>
					Phong cách mới, trải nghiệm với <span>T - Sneaker</span>
				</h4>
				<div className={styles.list}>
					{loading ? (
						<SkeletonLoading Item={SkeletonCategory} count={3} />
					) : (
						<>
							{category.map((v) => (
								<Link key={v._id} href={`/shop?_category=${v._id}`} className={styles.item}>
									<div className={styles.box_image}>
										<ImageFill src={v.image} fullHeight className={styles.image} />
									</div>
									<div className={styles.info}>
										<p className={styles.number}>{v.productCount} sản phẩm</p>
										<h4 className={styles.name}>{v.name}</h4>
									</div>
								</Link>
							))}
						</>
					)}
				</div>
			</div>
		</LayoutGrid>
	);
}

export default CategoryHome;
