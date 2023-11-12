import {Fragment, memo, useEffect, useMemo, useState} from 'react';
import {IoChevronBackOutline, IoChevronForwardOutline} from 'react-icons/io5';

import clsx from 'clsx';
import style from './Pagination.module.scss';
import {useRouter} from 'next/router';

function Pagination({
	total,
	onSetPage,
	pageSize,
	currentPage,
	isShowBtn = true,
	dependencies = [],
}: {
	total: number;
	pageSize: number;
	currentPage: number;
	onSetPage?: (any: any) => void;
	isShowBtn?: boolean;
	dependencies?: Array<any>;
}) {
	const router = useRouter();
	const [firstLoad, setFirstLoad] = useState<boolean>(true);

	const items = useMemo(() => {
		const items = [];
		const max = Math.ceil(total / pageSize);
		for (let i = 1; i <= max; i++) {
			if (i === currentPage - 1 || i === currentPage + 1 || i === currentPage || i === 1 || i === max) {
				items.push(
					<li
						key={i}
						className={clsx([style.item, {[style.active]: currentPage === i}])}
						onClick={() => {
							if (!!onSetPage) {
								onSetPage(i);
							} else {
								router.replace(
									{
										pathname: router.pathname,
										query: {
											...router.query,
											page: i,
										},
									},
									undefined,
									{shallow: true, scroll: false}
								);
							}
						}}
					>
						{i}
					</li>
				);
			}

			if ((i === currentPage - 2 && currentPage >= 4) || (i === currentPage + 2 && i < max)) {
				items.push(
					<li key={i} className={clsx([style.item, {[style.active]: currentPage === i}])}>
						...
					</li>
				);
			}
		}
		return items;
	}, [total, pageSize, currentPage, onSetPage]);

	const handlePrev = () => {
		if (currentPage > 1) {
			if (!!onSetPage) {
				onSetPage((prev: any) => prev - 1);
			} else {
				router.replace(
					{
						pathname: router.pathname,
						query: {
							...router.query,
							page: currentPage - 1,
						},
					},
					undefined,
					{shallow: true, scroll: false}
				);
			}
		}
	};

	const handleNext = () => {
		if (currentPage < Math.ceil(total / pageSize)) {
			if (!!onSetPage) {
				onSetPage((prev: any) => prev + 1);
			} else {
				router.replace(
					{
						pathname: router.pathname,
						query: {
							...router.query,
							page: currentPage + 1,
						},
					},
					undefined,
					{shallow: true, scroll: false}
				);
			}
		}
	};

	useEffect(() => {
		const handleStop = () => {
			setFirstLoad(false);
		};
		router.events.on('routeChangeStart', handleStop);

		return () => {
			router.events.off('routeChangeStart', handleStop);
		};
	}, []);

	useEffect(() => {
		if (!!onSetPage) {
			onSetPage((prev: any) => 1);
		} else {
			if (!firstLoad) {
				if (Object.keys(router.query).length > 0) {
					router.replace(
						{
							pathname: router.pathname,
							query: {
								...router.query,
								page: 1,
							},
						},
						undefined,
						{shallow: true, scroll: false}
					);
				}
			}
		}
	}, dependencies);

	return (
		<div className={style.main}>
			{total > pageSize ? (
				<Fragment>
					{isShowBtn && currentPage > 1 && (
						<button className={clsx([style.btn, style.left])} onClick={handlePrev}>
							<IoChevronBackOutline />
						</button>
					)}
					<ul className={style.list}>{items}</ul>
					{isShowBtn && currentPage < Math.ceil(total / pageSize) && (
						<button className={clsx([style.btn, style.right])} onClick={handleNext}>
							<IoChevronForwardOutline />
						</button>
					)}
				</Fragment>
			) : null}
		</div>
	);
}

export default memo(Pagination);
