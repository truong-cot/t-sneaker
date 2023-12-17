import {ShieldSecurity} from 'iconsax-react';
import {useState} from 'react';
import Button from '~/components/controls/Button';
import Form from '~/components/controls/Form/Form';
import InputForm from '~/components/controls/Form/components/InputForm/InputForm';
import styles from './MainChangePass.module.scss';
import {httpRequest} from '~/services';
import authServices from '~/services/authServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingScreen from '~/components/protected/LoadingScreen';

function MainChangePass() {
	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<any>({
		oldPass: '',
		newPass: '',
		resPass: '',
	});

	const onSubmit = () => {
		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: authServices.changePass({
				token: token!,
				accountId: infoUser?.account?._id!,
				oldPass: form?.oldPass,
				newPass: form?.newPass,
			}),
		}).then((data) => {
			if (data) {
				setForm({
					oldPass: '',
					newPass: '',
					resPass: '',
				});
			}
		});
	};

	return (
		<div>
			<LoadingScreen isLoading={loading} />
			<Form form={form} setForm={setForm} onSubmit={onSubmit}>
				<InputForm
					name='oldPass'
					label='Mật khẩu hiện tại'
					iconInput={<ShieldSecurity />}
					placeholder='Nhập mật khẩu hiện tại'
					onClean
					isRequired
					showDone
					type='password'
					textRequired='Vui lòng nhập mật khẩu hiện tại'
				/>
				<InputForm
					name='newPass'
					label='Mật khẩu mới'
					iconInput={<ShieldSecurity />}
					placeholder='Nhập mật khẩu mới'
					onClean
					isRequired
					showDone
					type='password'
					textRequired='Vui lòng nhập mật khẩu mới'
				/>
				<InputForm
					name='resPass'
					label='Xác nhận mật khẩu'
					iconInput={<ShieldSecurity />}
					placeholder='Nhập lại mật khẩu mới'
					onClean
					isRequired
					showDone
					type='password'
					valueConfirm={form.newPass}
					textConfirm='Mật khẩu không trùng khớp'
					textRequired='Vui lòng xác nhận lại mật khẩu'
				/>

				<div className={styles.btn}>
					<Button bold rounded_6 p_10_20 primary>
						Lưu mật khẩu
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default MainChangePass;
