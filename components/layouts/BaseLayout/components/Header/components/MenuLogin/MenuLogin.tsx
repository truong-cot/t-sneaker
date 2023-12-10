import React, {useEffect, useState} from 'react';
import {FaCartPlus} from 'react-icons/fa';
import TippyHeadless from '@tippyjs/react/headless';

import {PropsMenuLogin} from './interfaces';
import styles from './MenuLogin.module.scss';
import Avatar from '~/components/common/Avatar';
import ListMenu from '../ListMenu';
import clsx from 'clsx';
import BoxCart from '../BoxCart';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import cartServices from '~/services/cartServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function MenuLogin({}: PropsMenuLogin) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [openCart, setOpenCart] = useState<boolean>(false);
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [listCart, setListCart] = useState<any[]>([]);

	useEffect(() => {
		setOpenCart(false);
	}, [router]);

	useEffect(() => {
		if (infoUser?._id) {
			httpRequest({
				http: cartServices.getListCart({
					token: token!,
					userId: infoUser?._id as string,
				}),
			}).then((data) => {
				if (data) {
					setListCart(data);
				}
			});
		}
	}, [token, infoUser?._id, router]);

	return (
		<div className={styles.container}>
			<div className={styles.box_cart} onClick={() => setOpenCart(true)}>
				<div className={styles.icon}>
					<FaCartPlus size={24} color='#2A85FF' />
					<div className={styles.quantity}>{listCart?.length}</div>
				</div>
			</div>

			<div
				className={clsx(styles.list_cart, {
					[styles.open]: openCart,
				})}
			>
				<BoxCart listCart={listCart} onClose={() => setOpenCart(false)} />
			</div>
			{openCart && <div className={'overlay'} onClick={() => setOpenCart(false)}></div>}

			<TippyHeadless
				maxWidth={'100%'}
				interactive
				visible={openMenu}
				onClickOutside={() => setOpenMenu(false)}
				placement='bottom'
				render={(attrs) => <ListMenu onClose={() => setOpenMenu(false)} />}
			>
				<div onClick={() => setOpenMenu(!openMenu)} className={styles.box_profile}>
					<Avatar src={infoUser?.avatar!} className={styles.avatar} />
				</div>
			</TippyHeadless>
		</div>
	);
}

export default MenuLogin;
