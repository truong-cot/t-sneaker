import {Fragment} from 'react';
import Lottie from 'react-lottie';
import * as loading from '../../../public/static/anim/loading.json';
import styles from './LoadingScreen.module.scss';
import Portal from '~/components/common/Portal';

function LoadingScreen({isLoading}: {isLoading?: boolean}) {
	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: loading,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<Fragment>
			{isLoading && (
				<Portal>
					<div className={styles.container}>
						<div className={styles.ldsSpinner}>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</Portal>
			)}
		</Fragment>
	);
}

export default LoadingScreen;
