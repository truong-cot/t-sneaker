import React, {useState} from 'react';
import styles from './ArrangeShow.module.scss';
import {IoIosArrowDown} from 'react-icons/io';
import {MdOutlinePriceChange} from 'react-icons/md';
import {ImPriceTags} from 'react-icons/im';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {SORT_LIST, SORT_TYPE} from '~/constants/mocks/enum';

function ArrangeShow() {
	const router = useRouter();

	const {_sortList, _sortType} = router.query;

	const [openSort, setOpenSort] = useState<boolean>(false);

	// Hàm set value param
	const handleSetValueParam = (value: {sortList: number | null; sortType: number | null}) => {
		const {_sortList, _sortType, ...rest} = router.query;

		if (value.sortList == null && value.sortType == null) {
			return router.replace(
				{
					query: {
						...rest,
					},
				},
				undefined,
				{
					scroll: false,
				}
			);
		}

		return router.replace(
			{
				query: {
					...router.query,
					_sortList: value.sortList,
					_sortType: value.sortType,
				},
			},
			undefined,
			{
				scroll: false,
			}
		);
	};

	const listSort = [
		{
			sortList: SORT_LIST.PRICE,
			sortType: SORT_TYPE.ASC,
			text: 'Giá thấp đến cao',
		},
		{
			sortList: SORT_LIST.PRICE,
			sortType: SORT_TYPE.DESC,
			text: 'Giá cao đến thấp',
		},

		{
			sortList: SORT_LIST.SALE,
			sortType: SORT_TYPE.ASC,
			text: 'Khuyến mãi thấp đến cao',
		},
		{
			sortList: SORT_LIST.SALE,
			sortType: SORT_TYPE.DESC,
			text: 'Khuyến mãi cao đến thấp',
		},
	];

	const getTextSort = (sortList: number, sortType: number) => {
		if (sortList == SORT_LIST.PRICE) {
			if (sortType == SORT_TYPE.ASC) {
				return 'Giá thấp đến cao';
			} else if (sortType == SORT_TYPE.DESC) {
				return 'Giá cao đến thấp';
			}
		}

		if (sortList == SORT_LIST.SALE) {
			if (sortType == SORT_TYPE.ASC) {
				return 'Khuyến mãi thấp đến cao';
			} else if (sortType == SORT_TYPE.DESC) {
				return 'Khuyến mãi cao đến thấp';
			}
		}
	};

	return (
		<div className={styles.head}>
			<p className={styles.text}>Hiển thị: </p>
			<TippyHeadless
				maxWidth={'100%'}
				interactive
				visible={openSort}
				onClickOutside={() => setOpenSort(false)}
				placement='bottom'
				render={(attrs) => (
					<div className={styles.main_list}>
						<div
							className={clsx(styles.list_item, {
								[styles.active]: !_sortList && !_sortType,
							})}
							onClick={() => {
								handleSetValueParam({sortList: null, sortType: null});
								setOpenSort(false);
							}}
						>
							<p className={styles.text_list}>Mặc định</p>
						</div>
						{listSort.map((v, i) => (
							<div
								key={i}
								className={clsx(styles.list_item, {
									[styles.active]: v.sortList == Number(_sortList) && v.sortType == Number(_sortType),
								})}
								onClick={() => {
									handleSetValueParam({sortList: v.sortList, sortType: v.sortType});
									setOpenSort(false);
								}}
							>
								<p className={styles.text_list}>{v.text}</p>
							</div>
						))}
					</div>
				)}
			>
				<div className={styles.item} onClick={() => setOpenSort(!openSort)}>
					<div className={styles.left}>
						<div className={styles.icon_item}>
							<MdOutlinePriceChange size={20} color='#515c69' />
						</div>
						<p className={styles.text_item}>
							{!_sortList && !_sortType
								? 'Sắp xếp theo'
								: getTextSort(Number(_sortList), Number(_sortType))}
						</p>
					</div>
					<div
						className={clsx(styles.icon_item, {
							[styles.activePrice]: openSort,
						})}
					>
						<IoIosArrowDown size={18} color='#515c69' />
					</div>
				</div>
			</TippyHeadless>
		</div>
	);
}

export default ArrangeShow;
