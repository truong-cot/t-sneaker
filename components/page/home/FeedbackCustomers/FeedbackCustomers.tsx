import React, {useState} from 'react';

import styles from './FeedbackCustomers.module.scss';
import {PropsFeedbackCustomers} from './interfaces';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import {ArrowLeft, ArrowRight} from 'iconsax-react';
import Slider from 'react-slick';
import UserCart from './components/UserCart';
import icons from '~/constants/images/icons';

function SampleNextArrow(props: any) {
	const {onClick} = props;
	return (
		<div className={styles.next} onClick={onClick}>
			<ArrowRight />
		</div>
	);
}

function SamplePrevArrow(props: any) {
	const {onClick} = props;
	return (
		<div className={styles.prev} onClick={onClick}>
			<ArrowLeft />
		</div>
	);
}

function FeedbackCustomers({}: PropsFeedbackCustomers) {
	const [activeIndex, setActiveIndex] = useState<any>(0);
	const [nav1, setNav1] = useState<any>();
	const [nav2, setNav2] = useState<any>();

	return (
		<div className={styles.container}>
			<LayoutGrid>
				<div className={styles.wrapper}>
					<h4 className={styles.title}>
						KHÁCH HÀNG NÓI GÌ VỀ <span>T - SNEAKER</span>
					</h4>
					<div className={styles.main}>
						<Slider
							arrows={false}
							asNavFor={nav2}
							ref={(slider1: any) => setNav1(slider1)}
							afterChange={(index) => {
								setActiveIndex(index);
							}}
						>
							<div className={styles.slider_content}>
								<p className={styles.text_slider}>
									Giày bên shop có nhiều mẫu đẹp lắm , nhưng
									mà mình ưa mỗi van cá mập thôi , vừa mới mua
									bên shop , giày vừa , đẹp , sau ra mua ủng
									hộ shop tiếp.
								</p>
								<p className={styles.name}>Đặng Bá Trường</p>
								<span className={styles.job}>Sinh viên</span>
							</div>
							<div className={styles.slider_content}>
								<p className={styles.text_slider}>
									“ Em mua đôi converse của shop cách đây 2
									days 💙 Rất đẹp ạ.Giao hàng cũng rất nhanh.
									Mọi người nhớ ghé ủng hộ shop nhá 💦. Có dịp
									em sẽ ghé lại shop! ”
								</p>
								<p className={styles.name}>Đặng Bá Trường</p>
								<span className={styles.job}>Sinh viên</span>
							</div>
							<div className={styles.slider_content}>
								<p className={styles.text_slider}>
									“ Mới mua nên chưa biết độ bền thế nào nhưng
									giày đẹp, đúng đợt khuyến mãi nên giá rẻ,
									chủ shop nhiệt tình, shop nhiều quà tặng và
									ưu đãi. ”
								</p>
								<p className={styles.name}>Đặng Bá Trường</p>
								<span className={styles.job}>Sinh viên</span>
							</div>
							<div className={styles.slider_content}>
								<p className={styles.text_slider}>
									“ 2 lần mua ở shop rồi chất lượng và mọi thứ
									đều Oke ủng hộ shop dài. Cảm ơn shop đã có
									nhiều đôi giày đẹp. Shop nhớ cập nhật mẫu mã
									liên tục nhé ”
								</p>
								<p className={styles.name}>Đặng Bá Trường</p>
								<span className={styles.job}>Sinh viên</span>
							</div>
							<div className={styles.slider_content}>
								<p className={styles.text_slider}>
									“ Mới mua nên chưa biết độ bền thế nào nhưng
									giày đẹp, đúng đợt khuyến mãi nên giá rẻ,
									chủ shop nhiệt tình, shop nhiều quà tặng và
									ưu đãi. ”
								</p>
								<p className={styles.name}>Đặng Bá Trường</p>
								<span className={styles.job}>Sinh viên</span>
							</div>
							<div className={styles.slider_content}>
								<p className={styles.text_slider}>
									“ Em mua đôi converse của shop cách đây 2
									days 💙 Rất đẹp ạ.Giao hàng cũng rất nhanh.
									Mọi người nhớ ghé ủng hộ shop nhá 💦. Có dịp
									em sẽ ghé lại shop! ”
								</p>
								<p className={styles.name}>Đặng Bá Trường</p>
								<span className={styles.job}>Sinh viên</span>
							</div>
							<div className={styles.slider_content}>
								<p className={styles.text_slider}>
									“Giày bên shop có nhiều mẫu đẹp lắm , nhưng
									mà mình ưa mỗi van cá mập thôi , vừa mới mua
									bên shop , giày vừa , đẹp , sau ra mua ủng
									hộ shop tiếp.”
								</p>
								<p className={styles.name}>Đặng Bá Trường</p>
								<span className={styles.job}>Sinh viên</span>
							</div>
						</Slider>
						<div className={styles.userAvartas}>
							<Slider
								asNavFor={nav1}
								ref={(slider2: any) => setNav2(slider2)}
								slidesToShow={3}
								swipeToSlide
								focusOnSelect
								arrows
								autoplaySpeed={3000}
								autoplay
								centerMode
								centerPadding='-28px'
								nextArrow={<SampleNextArrow />}
								prevArrow={<SamplePrevArrow />}
							>
								<UserCart
									image={icons.placeholder}
									isActive={activeIndex == 0}
								/>
								<UserCart
									image={icons.placeholder}
									isActive={activeIndex == 1}
								/>
								<UserCart
									image={icons.placeholder}
									isActive={activeIndex == 2}
								/>
								<UserCart
									image={icons.placeholder}
									isActive={activeIndex == 3}
								/>
								<UserCart
									image={icons.placeholder}
									isActive={activeIndex == 4}
								/>
								<UserCart
									image={icons.placeholder}
									isActive={activeIndex == 5}
								/>
								<UserCart
									image={icons.placeholder}
									isActive={activeIndex == 6}
								/>
							</Slider>
						</div>
					</div>
				</div>
			</LayoutGrid>
		</div>
	);
}

export default FeedbackCustomers;
