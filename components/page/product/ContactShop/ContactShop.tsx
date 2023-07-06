import React from 'react';
import Logo from '~/components/common/Logo/Logo';
import {RiShieldCheckLine} from 'react-icons/ri';
import {AiOutlineLike} from 'react-icons/ai';
import {SiBackendless} from 'react-icons/si';

import styles from './ContactShop.module.scss';
import {formatPhoneNumber} from '~/common/func/convertPhoneNumber';

function ContactShop() {
	return (
		<div className={styles.box_3}>
			<div className={styles.box_3__top}>
				<div className={styles.logo}>
					<Logo linkRedirect='#' />
				</div>
				<div className={styles.box_3__main}>
					<div className={styles.box_3__main__item}>
						<div className={styles.box_3__main__icon}>
							<RiShieldCheckLine size={28} color='#006545' />
						</div>
						<p className={styles.box_3__main__text}>
							Hoàn tiền <br /> <b>100%</b> <br /> nếu không <br />{' '}
							đúng hàng
						</p>
					</div>
					<div className={styles.box_3__main__item}>
						<div className={styles.box_3__main__icon}>
							<AiOutlineLike size={28} color='#006545' />
						</div>
						<p className={styles.box_3__main__text}>
							Nhận hàng <br /> Kiểm tra <br /> hàng <br />
							Thoải mái
						</p>
					</div>
					<div className={styles.box_3__main__item}>
						<div className={styles.box_3__main__icon}>
							<SiBackendless size={28} color='#006545' />
						</div>
						<p className={styles.box_3__main__text}>
							Đổi trả trong <br /> <b>7 ngày</b> <br /> nếu sp lỗi
						</p>
					</div>
				</div>
			</div>
			<div className={styles.box_3__bottom}>
				<p className={styles.box_3__bottom__text}>Hotline đặt hàng</p>
				<p className={styles.text_phone}>
					{formatPhoneNumber('0123456789')}
				</p>
				<p className={styles.text_des}>(Zalo, 7h30 – 21h cả T7, CN)</p>
			</div>
		</div>
	);
}

export default ContactShop;
