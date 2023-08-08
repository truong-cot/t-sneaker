import React, {useState} from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import Link from 'next/link';
import styles from './FormLogin.module.scss';
import {PropsFormLogin} from './interfaces';
import Form from '~/components/controls/Form';
import InputForm from '~/components/controls/Form/components/InputForm';
import {ShieldSecurity, UserEdit} from 'iconsax-react';
import Button from '~/components/controls/Button';
import {httpRequest} from '~/services';
import authServices from '~/services/authServices';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {setStateLogin, setToken} from '~/redux/reducer/auth';
import {setLoading} from '~/redux/reducer/site';
import {setInfoUser, setUuidAccount, setUuidUser} from '~/redux/reducer/user';
import {RootState} from '~/redux/store';
import LoadingScreen from '~/components/protected/LoadingScreen';

function FormLogin({}: PropsFormLogin) {
	const router = useRouter();
	const dispatch = useDispatch();

	const {routerPrev} = useSelector((state: RootState) => state.site);

	const [form, setForm] = useState<any>({});
	const [isLoading, setisLoading] = useState(false);

	const onSubmit = () => {
		httpRequest({
			setLoading: setisLoading,
			showMessage: true,
			http: authServices.login({
				account: form.account,
				password: form.pass,
			}),
		}).then((data) => {
			if (data) {
				dispatch(setToken(data.token));
				dispatch(setLoading(false));
				dispatch(setStateLogin(true));
				dispatch(setInfoUser(data));
				dispatch(setUuidUser(data.uuid));
				dispatch(setUuidAccount(data.uuidAccount));

				setForm({
					account: '',
					pass: '',
				});

				router.replace(routerPrev, undefined, {scroll: false});
			}
		});
	};

	return (
		<>
			<LoadingScreen isLoading={isLoading} />

			<div className={styles.container}>
				<div className={styles.left}>
					<div className={styles.box_link}>
						<div className={styles.icon}>
							<IoIosArrowBack color='#a3aed0' size={18} />
						</div>
						<Link href={'/'} className={styles.link}>
							Trở về trang chủ
						</Link>
					</div>
					<div className={styles.main}>
						<h4 className={styles.title}>Đăng nhập</h4>
						<p className={styles.des}>Đăng nhập để sử dụng đầy đủ chức năng!</p>

						<Form form={form} setForm={setForm} onSubmit={onSubmit}>
							<InputForm
								name='account'
								placeholder='Nhập tên đăng nhập hoặc địa chỉ email'
								label='Tài khoản đăng nhập'
								isRequired
								textRequired='Vui lòng nhập tên đăng nhập hoặc địa chỉ email'
								showDone
								onClean
								type='text'
								iconInput={<UserEdit />}
							/>
							<InputForm
								name='pass'
								label='Nhập mật khẩu'
								iconInput={<ShieldSecurity />}
								placeholder='Nhập mật khẩu'
								onClean
								isRequired
								showDone
								type='password'
								textRequired='Vui lòng nhập mật khẩu'
							/>

							<div className={styles.btn}>
								<Button bold rounded_6 p_10_20 primary>
									Đăng nhập
								</Button>
							</div>
						</Form>
					</div>
				</div>
				<div className={styles.right}></div>
			</div>
		</>
	);
}

export default FormLogin;
