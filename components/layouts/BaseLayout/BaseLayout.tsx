import React, {useState, useEffect} from 'react';
import {PropsBaseLayout} from './interfaces';

import styles from './BaseLayout.module.scss';
import clsx from 'clsx';
import Header from './components/Header';
import Footer from './components/Footer';
import FooterContact from './components/FooterContact';

function BaseLayout({children}: PropsBaseLayout) {
	const [active, setActive] = useState<boolean>(false);
	const [scroll, setSroll] = useState<boolean>(false);

	useEffect(() => {
		let scrollY = 0;
		const handleScroll = (event: any) => {
			if (window.scrollY > 0) {
				setActive(true);
			} else {
				setActive(false);
			}

			if (window.scrollY >= scrollY && window.scrollY > 10) {
				setSroll(true);
			} else {
				setSroll(false);
			}
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={styles.container}>
			<div
				className={clsx(styles.header, {
					[styles.active]: active,
					[styles.scroll]: scroll,
				})}
			>
				<Header isScroll={scroll} />
			</div>
			<div className={styles.main}>{children}</div>
			<div className={styles.footer}>
				<Footer />
				<FooterContact />
			</div>
		</div>
	);
}

export default BaseLayout;
