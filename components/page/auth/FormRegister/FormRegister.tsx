import React, {useState} from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import Link from 'next/link';
import {PropsFormRegister} from './interfaces';
import styles from './FormRegister.module.scss';
import Form from '~/components/controls/Form/Form';
import InputForm from '~/components/controls/Form/components/InputForm/InputForm';
import {Book, SecurityUser, ShieldSecurity, UserEdit} from 'iconsax-react';
import Button from '~/components/controls/Button';
import {httpRequest} from '~/services';
import {useRouter} from 'next/router';
import authServices from '~/services/authServices';
import LoadingScreen from '~/components/protected/LoadingScreen';

function FormRegister({}: PropsFormRegister) {
	const router = useRouter();

	const [form, setForm] = useState<any>({});
	const [isLoading, setisLoading] = useState(false);

	const onSubmit = () => {
		httpRequest({
			setLoading: setisLoading,
			showMessage: true,
			http: authServices.register({
				account: form.username,
				email: form.email,
				fullname: form.fullname,
				password: form.pass,
			}),
		}).then((data) => {
			if (data) {
				setForm({
					account: '',
					email: '',
					fullname: '',
					password: '',
				});
				router.replace('/auth/login', undefined, {scroll: false});
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
						<h4 className={styles.title}>Đăng ký</h4>
						<p className={styles.des}>Đăng ký để sử dụng đầy đủ chức năng!</p>
						<Form form={form} setForm={setForm} onSubmit={onSubmit}>
							<InputForm
								name='fullname'
								placeholder='Nhập họ tên đầy đủ'
								label='Họ tên đầy đủ'
								isRequired
								textRequired='Vui lòng nhập họ tên đầy đủ'
								showDone
								onClean
								type='text'
								iconInput={<UserEdit />}
								value={form.fullname}
							/>
							<InputForm
								name='username'
								placeholder='Nhập tên đăng nhập'
								label='Tên đăng nhập'
								isRequired
								textRequired='Vui lòng nhập tên đăng nhập'
								showDone
								onClean
								type='text'
								iconInput={<SecurityUser />}
								value={form.username}
							/>
							<InputForm
								name='email'
								placeholder='Nhập địa chỉ email'
								label='Địa chỉ email'
								isRequired
								textRequired='Vui lòng nhập địa chỉ email'
								showDone
								onClean
								type='text'
								isEmail
								iconInput={<Book />}
								value={form.email}
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
								value={form.pass}
							/>
							<InputForm
								name='resPass'
								label='Nhập lại mật khẩu'
								iconInput={<ShieldSecurity />}
								placeholder='Nhập lại mật khẩu'
								onClean
								isRequired
								showDone
								type='password'
								valueConfirm={form.pass}
								textConfirm='Mật khẩu không trùng khớp'
								textRequired='Vui lòng nhập lại mật khẩu'
								value={form.resPass}
							/>
							<div className={styles.btn}>
								<Button bold rounded_6 p_10_20 primary>
									Đăng kí
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

export default FormRegister;
