import React, {useState} from 'react';
import styles from './ArrangeShow.module.scss';
import {IoIosArrowDown} from 'react-icons/io';
import {MdOutlinePriceChange} from 'react-icons/md';
import {ImPriceTags} from 'react-icons/im';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';

function ArrangeShow() {
	const [activePrice, setActivePrice] = useState<boolean>(false);
	const [activeSale, setActiveSale] = useState<boolean>(false);

	return (
		<div className={styles.head}>
			<p className={styles.text}>Hiển thị: </p>
			<TippyHeadless
				maxWidth={'100%'}
				interactive
				visible={activePrice}
				onClickOutside={() => setActivePrice(false)}
				placement='bottom'
				render={(attrs) => (
					<div className={styles.main_list}>
						<div className={styles.list_item}>
							<p className={styles.text_list}>Giá thấp đến cao</p>
						</div>
						<div className={styles.list_item}>
							<p className={styles.text_list}>Giá cao đến thấp</p>
						</div>
					</div>
				)}
			>
				<div
					className={styles.item}
					onClick={() => setActivePrice(!activePrice)}
				>
					<div className={styles.left}>
						<div className={styles.icon_item}>
							<MdOutlinePriceChange size={20} color='#515c69' />
						</div>
						<p className={styles.text_item}>Sắp xếp theo giá</p>
					</div>
					<div
						className={clsx(styles.icon_item, {
							[styles.activePrice]: activePrice,
						})}
					>
						<IoIosArrowDown size={18} color='#515c69' />
					</div>
				</div>
			</TippyHeadless>

			<TippyHeadless
				maxWidth={'100%'}
				interactive
				visible={activeSale}
				onClickOutside={() => setActiveSale(false)}
				placement='bottom'
				render={(attrs) => (
					<div className={styles.main_list}>
						<div className={styles.list_item}>
							<p className={styles.text_list}>
								Giảm giá thấp đến cao
							</p>
						</div>
						<div className={styles.list_item}>
							<p className={styles.text_list}>
								Giảm giá cao đến thấp
							</p>
						</div>
					</div>
				)}
			>
				<div
					className={styles.item}
					onClick={() => setActiveSale(!activeSale)}
				>
					<div className={styles.left}>
						<div className={styles.icon_item}>
							<ImPriceTags size={18} color='#515c69' />
						</div>
						<p className={styles.text_item}>Sắp xếp giá giảm giá</p>
					</div>
					<div
						className={clsx(styles.icon_item, {
							[styles.activeSale]: activeSale,
						})}
					>
						<IoIosArrowDown size={18} color='#515c69' />
					</div>
				</div>
			</TippyHeadless>
		</div>
	);
}

export default ArrangeShow;
