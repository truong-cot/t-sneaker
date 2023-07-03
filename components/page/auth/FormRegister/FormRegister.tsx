import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import {FcGoogle} from 'react-icons/fc';
import Link from 'next/link';
import {PropsFormRegister} from './interfaces';
import styles from './FormRegister.module.scss';

function FormRegister({}: PropsFormRegister) {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.box_link}>
					<div className={styles.icon}>
						<IoIosArrowBack color='#a3aed0' size={18} />
					</div>
					<Link href={'/'} className={styles.link}>
						Trở về trang chủ
					</Link>
				</div>
				<div className={styles.main}>
					<h4 className={styles.title}>Đăng ký</h4>
					<p className={styles.des}>
						Đăng ký để sử dụng đầy đủ chức năng!
					</p>
					<div className={styles.box_google}>
						<div className={styles.icon_google}>
							<FcGoogle size={20} />
						</div>
						<p className={styles.text_google}>Đăng ký với Google</p>
					</div>
					<div className={styles.box_or}>
						<div className={styles.line}></div>
						<p>hoặc</p>
						<div className={styles.line}></div>
					</div>
				</div>
			</div>
			<div className={styles.right}></div>
		</div>
	);
}

export default FormRegister;
