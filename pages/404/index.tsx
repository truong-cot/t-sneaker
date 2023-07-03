import React, {useEffect, useState} from 'react';
import styles from './NotFound.module.scss';
import Lottie from 'react-lottie';
import * as loading from '../../public/static/anim/notfound.json';
import Button from '~/components/controls/Button/Button';
import {useRouter} from 'next/router';
import Page from '~/components/layouts/Page';

function NotFound() {
	const router = useRouter();
	const [countDown, setCoutDown] = useState<number>(30);

	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: loading,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	useEffect(() => {
		if (countDown > 0) {
			const time = setTimeout(() => {
				setCoutDown(countDown - 1);
			}, 1000);
			return () => clearInterval(time);
		}
		if (countDown == 0) {
			router.replace('/', undefined, {scroll: false});
		}
	}, [countDown]);

	return (
		<Page disabledEffect title='Not Found (404)'>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Lottie
						style={{
							width: '32vw',
							height: '28vh',
							minWidth: '320px',
						}}
						options={defaultOptions2}
					/>
				</div>
				<h4 className={styles.title}>Không tìm thấy trang này !</h4>
				<div>
					<Button href='/' w_fit p_10_32 secondary rounded_24>
						Quay về trang chủ sau {countDown}s
					</Button>
				</div>
			</div>
		</Page>
	);
}

export default NotFound;
