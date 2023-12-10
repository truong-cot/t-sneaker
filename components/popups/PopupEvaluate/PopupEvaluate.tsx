import styles from './PopupEvaluate.module.scss';
import {PropsPopupEvaluate} from './interfaces';
import {AiFillStar} from 'react-icons/ai';
import Button from '~/components/controls/Button';
import {IoMdClose} from 'react-icons/io';
import clsx from 'clsx';
import {useState} from 'react';
import {toastText, toastWarn} from '~/common/func/toast';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import evaluateServices from '~/services/evaluateServices';
import {useRouter} from 'next/router';
import LoadingScreen from '~/components/protected/LoadingScreen';

function PopupEvaluate({onClose, idProduct}: PropsPopupEvaluate) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [numberStar, setNumberStar] = useState<number | null>(null);
	const [content, setContent] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const listStar: Array<any> = [
		{
			id: 1,
			icon: <AiFillStar size={24} />,
		},
		{
			id: 2,
			icon: <AiFillStar size={24} />,
		},
		{
			id: 3,
			icon: <AiFillStar size={24} />,
		},
		{
			id: 4,
			icon: <AiFillStar size={24} />,
		},
		{
			id: 5,
			icon: <AiFillStar size={24} />,
		},
	];

	const handleSubmit = async () => {
		if (!token) {
			return toastWarn({msg: 'Bạn chưa đăng nhập!'});
		}
		if (!infoUser?._id) {
			return toastWarn({msg: 'Không tìm thấy người dùng!'});
		}

		if (!numberStar) {
			return toastText({msg: 'Vui lòng chọn số sao bạn muốn đánh giá!'});
		}

		if (!content) {
			return toastText({msg: 'Vui lòng nhập nội dung đánh giá!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: evaluateServices.createEvaluate({
				token: token!,
				user: infoUser?._id!,
				product: idProduct,
				content: content,
				numberStar: numberStar,
			}),
		}).then((data) => {
			if (data) {
				onClose();
				router.replace(router.asPath, undefined, {scroll: false});
			}
		});
	};

	return (
		<div className={clsx(styles.container, 'effectZoom')}>
			<LoadingScreen isLoading={loading} />
			<p className={styles.title}>Đánh giá cho sản phẩm</p>
			<p className={styles.des}>Bạn có cảm nhận gì sau khi sử dụng sản phẩm của chúng tôi</p>
			<p className={styles.des_2}>Bạn hài lòng về chất lượng sản phẩm</p>
			<div className={styles.star}>
				{listStar.map((item) => (
					<div
						key={item.id}
						onClick={() => setNumberStar(item.id)}
						className={clsx(styles.icon_star, {
							[styles.star_active]: Number(item.id) <= Number(numberStar),
						})}
					>
						{item.icon}
					</div>
				))}
			</div>
			<p className={styles.des_3}>Nội dung đánh giá</p>
			<textarea
				className={styles.textarea}
				placeholder='Nội dụng đánh giá'
				value={String(content)}
				onChange={(e) => setContent(e.target.value)}
			/>

			<Button primary p_4_24 rounded_6 bold onClick={handleSubmit}>
				Gửi đánh giá
			</Button>

			<div onClick={onClose} className={styles.icon_close}>
				<IoMdClose size={20} />
			</div>
		</div>
	);
}

export default PopupEvaluate;
