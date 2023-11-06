import React, {useEffect, useRef, useState} from 'react';

import {PropsHeader} from './interfaces';
import styles from './Header.module.scss';
import clsx from 'clsx';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import Logo from '~/components/common/Logo';
import {linksNavHeader} from '~/constants/mocks/data';
import Link from 'next/link';
import {useRouter} from 'next/router';
import MenuLogin from './components/MenuLogin/MenuLogin';
import MenuLogged from './components/MenuLogged/MenuLogged';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function Header({isScroll}: PropsHeader) {
	const router = useRouter();
	const refActive = useRef<any>(null);
	const currentRoute = router.pathname.split('/')[1];

	const [offset, setOffset] = useState<any>({width: 0, left: 0});

	const {isLogin} = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (!!refActive?.current) {
			const id = setTimeout(() => {
				const {offsetWidth, offsetLeft} = refActive.current;
				setOffset({
					width: offsetWidth,
					left: offsetLeft,
				});

				return () => clearTimeout(id);
			}, 50);
		} else {
			setOffset({
				width: 0,
				left: 0,
			});
		}
	}, [refActive.current?.offsetWidth, currentRoute]);

	return (
		<div className={clsx(styles.container)}>
			<LayoutGrid>
				<div className={styles.main}>
					<div className={styles.logo}>
						<Logo />
					</div>

					<div className={styles.nav}>
						{linksNavHeader.map((v, i) => (
							<Link
								href={v.link}
								key={i}
								className={clsx(styles.itemNav, {
									[styles.active]: v.link === `/${currentRoute}`,
								})}
								ref={v.link === `/${currentRoute}` ? refActive : null}
							>
								{v.name}
							</Link>
						))}
						<div className={styles.line} style={{left: offset.left, width: offset.width}}></div>
					</div>
					<div className={styles.menu}>{isLogin ? <MenuLogin /> : <MenuLogged />}</div>
				</div>
			</LayoutGrid>
		</div>
	);
}

export default Header;
