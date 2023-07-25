import {ShieldSecurity} from 'iconsax-react';
import {useState} from 'react';
import Button from '~/components/controls/Button';
import Form from '~/components/controls/Form/Form';
import InputForm from '~/components/controls/Form/components/InputForm/InputForm';
import styles from './MainChangePass.module.scss';

function MainChangePass() {
	const [form, setForm] = useState<any>({
		oldPass: '',
		newPass: '',
		resPass: '',
	});

	const onSubmit = () => {
		console.log(form);
	};

	return (
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
	);
}

export default MainChangePass;
