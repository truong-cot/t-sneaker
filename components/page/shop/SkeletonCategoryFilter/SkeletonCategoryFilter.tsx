import Skeleton from 'react-loading-skeleton';
import styles from './SkeletonCategoryFilter.module.scss';

function SkeletonCategoryFilter() {
	return (
		<div className={styles.container}>
			<Skeleton className={styles.item} />
		</div>
	);
}

export default SkeletonCategoryFilter;
