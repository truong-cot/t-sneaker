import * as loading from '../../../public/static/anim/loading_data.json';

import {Fragment} from 'react';
import Lottie from 'react-lottie';
import style from './LoadingData.module.scss';

function LoadingData({
	isLoading,
	load,
	children,
	text = 'Đang tải ...',
}: {
	isLoading?: boolean;
	children: any;
	load?: any;
	text?: string;
}) {
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
			{isLoading ? (
				load ? (
					load
				) : (
					<div className={style.container}>
						<div className={style.logo}>
							<Lottie options={defaultOptions2} />
						</div>
						<p className={style.text}>{text}</p>
					</div>
				)
			) : (
				<Fragment>{children}</Fragment>
			)}
		</Fragment>
	);
}

export default LoadingData;
