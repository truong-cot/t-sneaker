import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react';

import {IBbanner, PropsBannerHome} from './interfaces';
import styles from './BannerHome.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import {httpRequest} from '~/services';
import bannerServices from '~/services/bannerServices';
import ImageFill from '~/components/common/ImageFill/ImageFill';

function SampleNextArrow(props: any) {
	const {onClick} = props;

	return (
		<div className={styles.next} onClick={onClick}>
			<ArrowRight2 />
		</div>
	);
}

function SamplePrevArrow(props: any) {
	const {onClick} = props;
	return (
		<div className={styles.prev} onClick={onClick}>
			<ArrowLeft2 />
		</div>
	);
}

function BannerHome({}: PropsBannerHome) {
	const [banners, setBanners] = useState<IBbanner[]>([]);

	useEffect(() => {
		httpRequest({
			http: bannerServices.getBanners({
				page: null,
				limit: null,
			}),
		}).then((data) => {
			if (data) {
				setBanners(data.items);
			}
		});
	}, []);

	return (
		<LayoutGrid>
			<div className={styles.container}>
				{banners.length > 0 ? (
					<Slider
						slidesToShow={1}
						swipeToSlide
						arrows
						autoplay
						autoplaySpeed={3000}
						nextArrow={<SampleNextArrow />}
						prevArrow={<SamplePrevArrow />}
					>
						{banners.map((v) => (
							<div className={styles.item} key={v.uuid}>
								<div className={styles.container_image}>
									<ImageFill
										src={v.urlImage}
										alt={v.name}
										layout='fill'
										objectFit='cover'
										className={styles.image}
									/>
								</div>
							</div>
						))}
					</Slider>
				) : (
					<ImageFill
						src={
							'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600'
						}
						alt={'banner default'}
						layout='fill'
						objectFit='cover'
						className={styles.image}
					/>
				)}
			</div>
		</LayoutGrid>
	);
}

export default BannerHome;
