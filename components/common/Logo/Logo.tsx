import Image from 'next/image';
import Link from 'next/link';
import {PropsLogo} from './interfaces';
import clsx from 'clsx';
import icons from '~/constants/images/icons';
import styles from './Logo.module.scss';

function Logo({className, linkRedirect, src}: PropsLogo) {
	return (
		<Link
			className={clsx(styles.container, className)}
			href={linkRedirect ? linkRedirect : '/'}
		>
			<Image src={src || icons.logo} alt='logo' layout='fill' priority />
		</Link>
	);
}

export default Logo;
