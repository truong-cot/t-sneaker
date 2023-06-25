import React from 'react';
import {AiOutlineFullscreen} from 'react-icons/ai';
import {TbNumbers} from 'react-icons/tb';

import {PropsItemCart} from './interfaces';
import styles from './ItemCart.module.scss';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import {convertCoin} from '~/common/func/convertCoin';
import Button from '~/components/controls/Button/Button';
import {Trash} from 'iconsax-react';

function ItemCart({}: PropsItemCart) {
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.box_image}>
					<ImageFill fullHeight className={styles.image} />
				</div>
				<div className={styles.content}>
					<h4 className={styles.name}>
						Giày Adidas superstar chảy màu kem
					</h4>
					<div className={styles.item}>
						<div className={styles.icon}>
							<AiOutlineFullscreen color='#788a9b' size={20} />
						</div>
						<p className={styles.text}>
							Kích cỡ: <span>38</span>
						</p>
					</div>
					<div className={styles.item}>
						<div className={styles.icon}>
							<TbNumbers color='#788a9b' size={22} />
						</div>
						<p className={styles.text}>
							Số lượng: <span>3</span>
						</p>
					</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.box_price}>
					<p className={styles.text_price}>Thành giá:</p>
					<p className={styles.price}>{convertCoin(200000000)}đ</p>
				</div>
				<div className={styles.control}>
					<div className={styles.clear}>
						<Trash size={20} className={styles.trash} />
					</div>
					<Button primary p_6_12 rounded_20>
						Xem chi tiết
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ItemCart;
