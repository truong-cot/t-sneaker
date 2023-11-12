import Skeleton from 'react-loading-skeleton';
import styles from './SkeletonCardProduct.module.scss';

function SkeletonCardProduct() {
	return (
		<div className={styles.container}>
			<Skeleton className={styles.image_1} />
			<Skeleton className={styles.line_2} />
			<Skeleton className={styles.line_3} />
			<Skeleton className={styles.line_4} />
		</div>
	);
}

export default SkeletonCardProduct;
