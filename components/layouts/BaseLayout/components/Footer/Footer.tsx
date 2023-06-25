import React from 'react';

import {PropsFooter} from './interfaces';
import styles from './Footer.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid/LayoutGrid';
import Logo from '~/components/common/Logo/Logo';
import icons from '~/constants/images/icons';
import Link from 'next/link';
import {linksNavHeader, listPolicy} from '~/constants/mocks/data';

function Footer({}: PropsFooter) {
	return (
		<div className={styles.container}>
			<LayoutGrid>
				<div className={styles.main}>
					<div className={styles.overview}>
						<Logo src={icons.logo_white} className={styles.logo} />
						<p className={styles.des}>
							<span>T - Sneaker</span> nơi trao tặng các sản phẩm
							giày thời trang trẻ trung, phong cách, bắt trend cho
							giới trẻ.
						</p>
						<p className={styles.des}>
							<span>Địa chỉ: </span> Số 10, đường X cũ, Học viện
							Nông nghiệp Việt Nam, Thị trấn Trâu Quỳ, Gia Lâm, Hà
							Nội
						</p>
						<p className={styles.des}>
							<span>Hotline: </span> 0339940200
						</p>
						<p className={styles.des}>
							<span>Email: </span> dangtruong.work@gmail.com
						</p>
					</div>
					<div className={styles.item}>
						<h4 className={styles.title}>LIÊN KẾT NHANH</h4>
						{linksNavHeader.map((v, i) => (
							<Link key={i} href={v.link} className={styles.link}>
								{v.name}
							</Link>
						))}
					</div>
					<div className={styles.item}>
						<h4 className={styles.title}>Các chính sách</h4>
						{listPolicy.map((v, i) => (
							<Link key={i} href={v.link} className={styles.link}>
								{v.name}
							</Link>
						))}
					</div>
					<div className={styles.item}>
						<h4 className={styles.title}>KẾT NỐI VẬN CHUYỂN</h4>
						<p className={styles.link}>Giao hàng tiết kiệm</p>
						<p className={styles.link}>Giao hàng nhanh</p>
						<p className={styles.link}>Viettel Post</p>
						<p className={styles.link}>Bưu điện Việt Nam</p>
					</div>
				</div>
			</LayoutGrid>
		</div>
	);
}

export default Footer;
