import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';
import styles from './SkeletonCategory.module.scss';

function SkeletonCategory() {
	return (
		<div className={styles.container}>
			<Skeleton className={styles.box_time} />
		</div>
	);
}

export default SkeletonCategory;
