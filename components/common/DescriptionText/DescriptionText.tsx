import {useEffect, useMemo, useRef, useState} from 'react';

import {PropsDescriptionText} from './interfaces';
import clsx from 'clsx';
import styles from './DescriptionText.module.scss';

function DescriptionText({des}: PropsDescriptionText) {
	const textContainerRef = useRef<any>(null);
	const [seeMore, setSeeMore] = useState<boolean>(false);
	const [ready, setReady] = useState<boolean>(false);
	const lineDes = useMemo(() => {
		if (textContainerRef && textContainerRef.current) {
			const textContainer = textContainerRef.current;
			const lineCount =
				textContainer.clientHeight /
				parseFloat(getComputedStyle(textContainer).lineHeight);

			return Math.ceil(lineCount);
		}

		return 0;
	}, [textContainerRef.current, ready]);

	useEffect(() => {
		if (document) {
			setReady(true);
		}
	}, []);

	return (
		<div>
			<div
				ref={textContainerRef}
				className={clsx(styles.des, {
					[styles.seemore]: seeMore,
					[styles.hidden]: lineDes >= 3,
				})}
				dangerouslySetInnerHTML={{
					__html: des,
				}}
			></div>
			{des && lineDes >= 3 && (
				<div className={styles.see_more}>
					<p
						onClick={() => setSeeMore(!seeMore)}
						className={styles.text_see_more}
					>
						{seeMore ? 'Ẩn bớt' : 'Xem thêm'}
					</p>
				</div>
			)}
		</div>
	);
}

export default DescriptionText;
