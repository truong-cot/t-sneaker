import React from 'react';

import styles from './MenuLogged.module.scss';
import {PropsMenuLogged} from './interfaces';
import Button from '~/components/controls/Button/Button';

function MenuLogged({}: PropsMenuLogged) {
	return (
		<div className={styles.container}>
			<Button href='/auth/register' primary_line rounded_24 p_8_24>
				Đăng kí
			</Button>
			<Button href='/auth/login' primary rounded_24 p_8_24>
				Đăng nhập
			</Button>
		</div>
	);
}

export default MenuLogged;
