import React, {useEffect, useState} from 'react';
import {PropsSidebarShop} from './interfaces';

import styles from './SidebarShop.module.scss';
import {convertCoin} from '~/common/func/convertCoin';

function SidebarShop({}: PropsSidebarShop) {
	const [category, setCategory] = useState<any>([]);
	const [valueRadio, setValueRadio] = useState<any>('');
	const [status, setStatus] = useState<any>([]);

	// Set all value radio
	useEffect(() => {
		setValueRadio('all');
	}, []);

	// Lấy danh sách loại sản phẩm
	const handleGetValueCategory = (value: any) => {
		if (category.includes(value)) {
			// Nếu giá trị đã được chọn, hãy loại bỏ nó khỏi mảng
			setCategory(category.filter((v: any) => v !== value));
		} else {
			// Nếu giá trị chưa được chọn, hãy thêm nó vào mảng
			setCategory([...category, value]);
		}
	};

	// Lấy danh sách trạng thái sản phẩm
	const handleGetValueStatus = (value: any) => {
		if (status.includes(value)) {
			// Nếu giá trị đã được chọn, hãy loại bỏ nó khỏi mảng
			setStatus(status.filter((v: any) => v !== value));
		} else {
			// Nếu giá trị chưa được chọn, hãy thêm nó vào mảng
			setStatus([...status, value]);
		}
	};

	// Lấy value radio
	const handleRadioChange = (e: any) => {
		setValueRadio(e.target.value);
	};

	return (
		<div className={styles.container}>
			{/* Danh mục sản phẩm */}
			<h4 className={styles.title}>Danh mục sản phẩm</h4>
			<div className={styles.list_category}>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='checkbox'
						id='category_1'
						name='category'
						value='category 1'
						onChange={() => handleGetValueCategory('category 1')}
					/>
					<label className={styles.label} htmlFor='category_1'>
						category 1
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='checkbox'
						id='category_2'
						name='category'
						value='category 2'
						onChange={() => handleGetValueCategory('category 2')}
					/>
					<label className={styles.label} htmlFor='category_2'>
						category 2
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='checkbox'
						id='category_3'
						name='category'
						value='category 3'
						onChange={() => handleGetValueCategory('category 3')}
					/>
					<label className={styles.label} htmlFor='category_3'>
						category 3
					</label>
				</div>
			</div>

			{/* Trạng thái sản phẩm */}
			<div className={styles.price}>
				<h4 className={styles.title}>Trạng thái sản phẩm</h4>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='checkbox'
						id='status_0'
						name='status'
						value='status 0'
						onChange={() => handleGetValueStatus('status 0')}
					/>
					<label className={styles.label} htmlFor='status_0'>
						Sản phẩm mới
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='checkbox'
						id='status_1'
						name='status'
						value='status 1'
						onChange={() => handleGetValueStatus('status 1')}
					/>
					<label className={styles.label} htmlFor='status_1'>
						Sản phẩm được giảm giá
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='checkbox'
						id='status_2'
						name='status'
						value='status 2'
						onChange={() => handleGetValueStatus('status 2')}
					/>
					<label className={styles.label} htmlFor='status_2'>
						Sản phẩm đang HOT
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='checkbox'
						id='status_3'
						name='status'
						value='status 3'
						onChange={() => handleGetValueStatus('status 3')}
					/>
					<label className={styles.label} htmlFor='status_3'>
						Sản phẩm đang TRENDT
					</label>
				</div>
			</div>

			{/* Giá sản phẩm */}
			<div className={styles.price}>
				<h4 className={styles.title}>Giá sản phẩm</h4>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='radio'
						id='price_1'
						name='price'
						value='all'
						checked={valueRadio == 'all'}
						onChange={handleRadioChange}
					/>
					<label className={styles.label} htmlFor='price_1'>
						Tất cả
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='radio'
						id='price_2'
						name='price'
						value='price 1'
						checked={valueRadio == 'price 1'}
						onChange={handleRadioChange}
					/>
					<label className={styles.label} htmlFor='price_2'>
						Dưới {convertCoin(1000000)}đ
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='radio'
						id='price_3'
						name='price'
						value='price 2'
						checked={valueRadio == 'price 2'}
						onChange={handleRadioChange}
					/>
					<label className={styles.label} htmlFor='price_3'>
						{convertCoin(1000000)}đ - {convertCoin(3000000)}đ
					</label>
				</div>
				<div className={styles.item_category}>
					<input
						className={styles.checkbox}
						type='radio'
						id='price_4'
						name='price'
						value='price 3'
						checked={valueRadio == 'price 3'}
						onChange={handleRadioChange}
					/>
					<label className={styles.label} htmlFor='price_4'>
						Trên {convertCoin(3000000)}đ
					</label>
				</div>
			</div>
		</div>
	);
}

export default SidebarShop;
