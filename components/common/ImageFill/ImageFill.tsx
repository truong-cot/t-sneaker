import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import clsx from 'clsx';
import styles from './ImageFill.module.scss';
import {useStyleClass} from '~/common/hooks/usStyleClass';

function ImageFill({src, className, fullHeight = false, ...props}: any) {
	const styleClass = useStyleClass(props, styles);

	return (
		<div
			className={clsx(styles.container, {
				[styles.fullHeight]: fullHeight,
			})}
		>
			<div
				className={clsx(styles.main, className, styleClass, {
					[styles.fullHeight]: fullHeight,
				})}
			>
				<ImageWithFallback
					src={src}
					layout='fill'
					alt={props.alt || 'Mobi Med'}
				/>
			</div>
		</div>
	);
}

export default ImageFill;
