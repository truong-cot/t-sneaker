import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react';

import {PropsBannerHome} from './interfaces';
import styles from './BannerHome.module.scss';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import LoadingScreen from '~/components/protected/LoadingScreen';

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
	return (
		<LayoutGrid>
			{/* <LoadingScreen isLoading={true} /> */}
			<div className={styles.container}>
				<Slider
					slidesToShow={1}
					swipeToSlide
					arrows
					autoplay
					autoplaySpeed={3000}
					nextArrow={<SampleNextArrow />}
					prevArrow={<SamplePrevArrow />}
				>
					<div className={styles.item}>
						<div className={styles.container_image}>
							<Image
								src='https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600'
								alt='Image'
								layout='fill'
								objectFit='cover'
								className={styles.image}
							/>
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.container_image}>
							<Image
								src='https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg?auto=compress&cs=tinysrgb&w=1600'
								alt='Image'
								layout='fill'
								objectFit='cover'
								className={styles.image}
							/>
						</div>
					</div>
				</Slider>
			</div>
		</LayoutGrid>
	);
}

export default BannerHome;
