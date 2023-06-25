import React, {useState} from 'react';
import {FaCartPlus} from 'react-icons/fa';
import TippyHeadless from '@tippyjs/react/headless';

import {PropsMenuLogin} from './interfaces';
import styles from './MenuLogin.module.scss';
import Avatar from '~/components/common/Avatar';
import ListMenu from '../ListMenu';
import clsx from 'clsx';
import BoxCart from '../BoxCart';

function MenuLogin({}: PropsMenuLogin) {
	const [openCart, setOpenCart] = useState<boolean>(false);
	const [openMenu, setOpenMenu] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<div className={styles.box_cart} onClick={() => setOpenCart(true)}>
				<div className={styles.icon}>
					<FaCartPlus size={24} color='#2A85FF' />
					<div className={styles.quantity}>3</div>
				</div>
			</div>

			<div
				className={clsx(styles.list_cart, {
					[styles.open]: openCart,
				})}
			>
				<BoxCart onClose={() => setOpenCart(false)} />
			</div>
			{openCart && (
				<div
					className={styles.overlay}
					onClick={() => setOpenCart(false)}
				></div>
			)}

			<TippyHeadless
				maxWidth={'100%'}
				interactive
				visible={openMenu}
				onClickOutside={() => setOpenMenu(false)}
				placement='bottom'
				render={(attrs) => (
					<ListMenu onClose={() => setOpenMenu(false)} />
				)}
			>
				<div
					onClick={() => setOpenMenu(!openMenu)}
					className={styles.box_profile}
				>
					<Avatar className={styles.avatar} />
				</div>
			</TippyHeadless>
		</div>
	);
}

export default MenuLogin;
