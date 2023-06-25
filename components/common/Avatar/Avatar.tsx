import Image from 'next/image';
import {PropsAvatar} from './interfaces';
import clsx from 'clsx';
import icons from '~/constants/images/icons';
import styles from './Avatar.module.scss';
import ImageWithFallback from '../ImageWithFallback';

function Avatar({src, className}: PropsAvatar) {
	return (
		<div className={clsx(styles.container, className)}>
			<ImageWithFallback
				className={styles.avatar}
				layout='fill'
				alt='avatar'
				src={src || icons.placeholder}
				priority
			/>
		</div>
	);
}

export default Avatar;
