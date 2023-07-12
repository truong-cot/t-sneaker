import {Trash} from 'iconsax-react';
import MoneyShip from '../MoneyShip';
import styles from './MainListCart.module.scss';
import CartItem from '../CartItem';
import {TypeCart, listCart} from '~/constants/mocks/data';
import {useContext, useEffect, useState} from 'react';
import {ContextCart, TypeContext} from '../context';

function MainListCart() {
	// Gọi context
	const context = useContext<TypeContext>(ContextCart);

	// State giỏ hàng ban đầu
	const [carts, setCarts] = useState<TypeCart[]>([]);

	// Lấy giỏ hàng ban đầu
	useEffect(() => {
		setCarts(listCart);
	}, [listCart]);

	// Hàm tăng số lượng
	const plusNumber = (id: string) => {
		// Update mảng giỏ hàng cho trước
		const updateCart = carts.map((v) => {
			if (v.id == id) {
				return {...v, qlt: v.qlt + 1};
			}
			return v;
		});

		// Update mảng giỏ hàng được chọn
		const updateChosseCart = context.listCart.map((v) => {
			if (v.id == id) {
				return {...v, qlt: v.qlt + 1};
			}
			return v;
		});

		setCarts(updateCart);
		context.setListCart(updateChosseCart);
	};

	// Hàm giảm số lượng
	const minusNumber = (id: string) => {
		// Update mảng giỏ hàng cho trước
		const updateCart = carts.map((v) => {
			if (v.id == id) {
				return {...v, qlt: v.qlt - 1};
			}
			return v;
		});

		// Update mảng giỏ hàng được chọn
		const updateChosseCart = context.listCart.map((v) => {
			if (v.id == id) {
				return {...v, qlt: v.qlt - 1};
			}
			return v;
		});

		setCarts(updateCart);
		context.setListCart(updateChosseCart);
	};

	// Hàm xóa sản phẩm
	const deleteCart = (id: string) => {
		// Xóa giỏ hàng cho trước
		const updateCart = carts.filter((v) => v.id != id);

		// Nếu xóa đơn hàng nằm trong giỏ hàng được chọn thì xóa khỏi giỏ hàng được chọn
		const updateChosseCart = context.listCart.filter((v) => v.id != id);

		setCarts(updateCart);
		context.setListCart(updateChosseCart);
	};

	// Hàm chọn tất cả sản phẩm
	const chosseAllCart = () => {
		if (context.listCart.length == carts.length) {
			context.setListCart([]);
		} else {
			context.setListCart(carts);
		}
	};

	// Hàm xóa tất cả sản phẩm được chọn
	const deleteAllChosseCart = () => {
		context.setListCart([]);
	};

	return (
		<div className={styles.container}>
			{/* Phí ship */}
			<MoneyShip />

			{/* Main */}
			<div className={styles.main}>
				<div className={styles.top}>
					<div className={styles.left}>
						<div className={styles.item}>
							<input
								className={styles.checkbox}
								type='checkbox'
								id='all_cart'
								onChange={() => null}
								defaultChecked={false}
								checked={
									context.listCart.length == carts.length
								}
								onClick={chosseAllCart}
							/>
							<label className={styles.label} htmlFor='all_cart'>
								Tất cả ({carts.length})
							</label>
						</div>
					</div>
					<div className={styles.right}>
						<p className={styles.text}>Đơn giá</p>
						<p className={styles.text}>Kích cỡ</p>
						<p className={styles.text}>Số lượng</p>
						<p className={styles.text}>Thành tiền</p>
						<div>
							<div
								className={styles.icon}
								onClick={deleteAllChosseCart}
							>
								<Trash className={styles.trash} />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.list}>
					{carts.map((v) => (
						<CartItem
							key={v.id}
							data={v}
							plusNumber={plusNumber}
							minusNumber={minusNumber}
							deleteCart={deleteCart}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default MainListCart;
