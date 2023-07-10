import {Trash} from 'iconsax-react';
import MoneyShip from '../MoneyShip';
import styles from './MainListCart.module.scss';
import CartItem from '../CartItem';
import {listCart} from '~/constants/mocks/data';

function MainListCart() {
	const plusNumber = (id: string) => {
		const item = listCart.find((v) => v.id == id);
		if (item) {
			console.log([...listCart, {...item, qlt: item?.qlt}]);
			// return [...listCart, {...item, qlt: item?.qlt}];
		}
	};

	return (
		<div className={styles.container}>
			<MoneyShip />
			<div className={styles.main}>
				<div className={styles.top}>
					<div className={styles.left}>
						<div className={styles.item}>
							<input
								className={styles.checkbox}
								type='checkbox'
								id='all_cart'
								// checked
							/>
							<label className={styles.label} htmlFor='all_cart'>
								Tất cả (3)
							</label>
						</div>
					</div>
					<div className={styles.right}>
						<p className={styles.text}>Đơn giá</p>
						<p className={styles.text}>Số lượng</p>
						<p className={styles.text}>Thành tiền</p>
						<div>
							<div className={styles.icon}>
								<Trash className={styles.trash} />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.list}>
					{listCart.map((v) => (
						<CartItem key={v.id} data={v} plusNumber={plusNumber} />
					))}
				</div>
			</div>
		</div>
	);
}

export default MainListCart;
