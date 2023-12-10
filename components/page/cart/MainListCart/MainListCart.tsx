import MoneyShip from '../MoneyShip';
import styles from './MainListCart.module.scss';
import CartItem from '../CartItem';
import {Fragment, useContext, useEffect, useState} from 'react';
import {ContextCart, TypeContext} from '../context';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import cartServices from '~/services/cartServices';
import {ICart, PropsMainListCart} from './interfaces';

function MainListCart({}: PropsMainListCart) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	// Gọi context
	const context = useContext<TypeContext>(ContextCart);

	// State giỏ hàng ban đầu
	const [carts, setCarts] = useState<ICart[]>([]);

	useEffect(() => {
		httpRequest({
			http: cartServices.getListCart({
				token: token!,
				userId: infoUser?._id as string,
			}),
		}).then((data) => {
			if (data) {
				setCarts(data);
			}
		});
	}, [token, infoUser?._id, router]);

	// Hàm tăng số lượng
	const plusNumber = (id: string) => {
		const updateCart = carts.map((v) => {
			if (v._id == id) {
				return {...v, quality: v.quality + 1};
			}
			return v;
		});

		const updateChosseCart = context.listCart.map((v) => {
			if (v._id == id) {
				return {...v, quality: v.quality + 1};
			}
			return v;
		});

		setCarts(updateCart);
		context.setListCart(updateChosseCart);
	};

	// Hàm giảm số lượng
	const minusNumber = (id: string) => {
		const updateCart = carts.map((v) => {
			if (v._id == id) {
				return {...v, quality: v.quality - 1};
			}
			return v;
		});

		const updateChosseCart = context.listCart.map((v) => {
			if (v._id == id) {
				return {...v, quality: v.quality - 1};
			}
			return v;
		});

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

	return (
		<Fragment>
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
									checked={context.listCart.length == carts.length}
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
						</div>
					</div>
					<div className={styles.list}>
						{carts.map((v) => (
							<CartItem key={v._id} data={v} plusNumber={plusNumber} minusNumber={minusNumber} />
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default MainListCart;
