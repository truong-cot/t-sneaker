import Skeleton from 'react-loading-skeleton';
import styles from './SkeletonCardProduct.module.scss';

function SkeletonCardProduct() {
	return (
		<div className={styles.container}>
			<Skeleton className={styles.image_1} />

			{/* <div className={styles.list}>
				<Skeleton className={styles.image_2} />
				<Skeleton className={styles.image_2} />
				<Skeleton className={styles.image_2} />
				<Skeleton className={styles.image_2} />
			</div> */}
			<Skeleton className={styles.line_1} />
			<Skeleton className={styles.line_1} />
			<Skeleton className={styles.line_2} />
			<Skeleton className={styles.line_3} />
			<Skeleton className={styles.line_4} />

			{/* <div className={styles.line}></div>

			<div className={styles.bottom}>
				<div className={styles.item}>
					<Skeleton className={styles.btn} />
				</div>
				<div className={styles.item}>
					<Skeleton className={styles.btn} />
				</div>
			</div> */}
		</div>
	);
}

export default SkeletonCardProduct;
