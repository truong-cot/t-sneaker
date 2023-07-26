import React from 'react';

import {PropsCategoryHome} from './interfaces';
import styles from './CategoryHome.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';
import Link from 'next/link';
import ImageFill from '~/components/common/ImageFill';

function CategoryHome({}: PropsCategoryHome) {
	return (
		<LayoutGrid>
			<div className={styles.container}>
				<h4 className={styles.title}>
					Phong cách mới, trải nghiệm với <span>T - Sneaker</span>
				</h4>
				<div className={styles.list}>
					<Link href={'/shop?category=category 1'} className={styles.item}>
						<div className={styles.box_image}>
							<ImageFill fullHeight className={styles.image} />
						</div>
						<div className={styles.info}>
							<p className={styles.number}>12 sản phẩm</p>
							<h4 className={styles.name}>ADIDAS</h4>
						</div>
					</Link>
					<Link href={'/shop?category=category 1'} className={styles.item}>
						<div className={styles.box_image}>
							<ImageFill fullHeight className={styles.image} />
						</div>
						<div className={styles.info}>
							<p className={styles.number}>12 sản phẩm</p>
							<h4 className={styles.name}>ADIDAS</h4>
						</div>
					</Link>
					<Link href={'/shop?category=category 1'} className={styles.item}>
						<div className={styles.box_image}>
							<ImageFill fullHeight className={styles.image} />
						</div>
						<div className={styles.info}>
							<p className={styles.number}>12 sản phẩm</p>
							<h4 className={styles.name}>ADIDAS</h4>
						</div>
					</Link>
					<Link href={'/shop?category=category 1'} className={styles.item}>
						<div className={styles.box_image}>
							<ImageFill fullHeight className={styles.image} />
						</div>
						<div className={styles.info}>
							<p className={styles.number}>12 sản phẩm</p>
							<h4 className={styles.name}>ADIDAS</h4>
						</div>
					</Link>
					<Link href={'/shop?category=category 1'} className={styles.item}>
						<div className={styles.box_image}>
							<ImageFill fullHeight className={styles.image} />
						</div>
						<div className={styles.info}>
							<p className={styles.number}>12 sản phẩm</p>
							<h4 className={styles.name}>ADIDAS</h4>
						</div>
					</Link>

					<Link href={'/shop?category=category 1'} className={styles.item}>
						<div className={styles.box_image}>
							<ImageFill fullHeight className={styles.image} />
						</div>
						<div className={styles.info}>
							<p className={styles.number}>12 sản phẩm</p>
							<h4 className={styles.name}>ADIDAS</h4>
						</div>
					</Link>
					<Link href={'/shop?category=category 1'} className={styles.item}>
						<div className={styles.box_image}>
							<ImageFill fullHeight className={styles.image} />
						</div>
						<div className={styles.info}>
							<p className={styles.number}>12 sản phẩm</p>
							<h4 className={styles.name}>ADIDAS</h4>
						</div>
					</Link>
					<Link href={'/shop?category=category 1'} className={styles.item}>
						<div className={styles.box_image}>
							<ImageFill fullHeight className={styles.image} />
						</div>
						<div className={styles.info}>
							<p className={styles.number}>12 sản phẩm</p>
							<h4 className={styles.name}>ADIDAS</h4>
						</div>
					</Link>
				</div>
			</div>
		</LayoutGrid>
	);
}

export default CategoryHome;
