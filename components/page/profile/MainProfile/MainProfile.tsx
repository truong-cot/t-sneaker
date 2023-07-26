import React, {useCallback, useState} from 'react';

import styles from './MainProfile.module.scss';
import {PropsMainProfile} from './interfaces';
import Form from '~/components/controls/Form/Form';
import clsx from 'clsx';
import {toastError, toastWarn} from '~/common/func/toast';
import Avatar from './components/Avatar';
import Button from '~/components/controls/Button';
import InputForm from '~/components/controls/Form/components/InputForm/InputForm';
import {CallIncoming, DirectboxNotif, SecurityUser, UserTick} from 'iconsax-react';
import {GENDER} from '~/constants/mocks/enum';
import Select, {Option} from '~/components/controls/Select';

function MainProfile({}: PropsMainProfile) {
	const [form, setForm] = useState<any>({});

	function getBase64(file: any) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			setForm((prev: any) => ({
				...prev,
				imageBase64: reader.result,
			}));
		};
	}

	const handleSelectImg = (e: any) => {
		/*---------- Kiểm tra nếu có file ----------*/
		if (!e.target.files[0]) {
			return;
		}

		const {size, type} = e.target.files[0];
		const maxSize = 10; //MB

		if (size / 1000000 > maxSize) {
			toastError({msg: `Kích thước tối đa của ảnh là ${maxSize} mb`});
			return;
		} else if (type !== 'image/jpeg' && type !== 'image/jpg' && type !== 'image/png') {
			toastWarn({
				msg: `Định dạng tệp không chính xác, đuôi tệp chấp nhận .jpg, .jpeg, .png`,
			});
			return;
		}

		/*---------- Chuyển thành dạng base64 ----------*/
		getBase64(e.target.files[0]);
		setForm((prev: any) => ({...prev, file: e.target.files[0]}));
	};

	const handleChange = useCallback((e: any) => {
		const {name, value} = e.target;

		setForm((prev: any) => ({...prev, [name]: value})); //=> add value form interface
	}, []); //on

	const handleSubmit = () => {};

	return (
		<div className={styles.container}>
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={clsx(styles.avatar, 'effectShow')}>
					<Avatar src={form?.imageBase64 || ''} name='avatar' onChange={handleSelectImg} />
					<div className={styles.text}>
						<p>Upload image với dung lượng &lt; 15MB</p>
						<p>Định dạng hỗ trợ: JPG, JPEG, PNG</p>
					</div>
				</div>

				<div className={clsx(styles.form, 'effectShow')}>
					<h3 className={styles.titleGroup}>Thông tin hồ sơ</h3>
					<div className={styles.col_1}>
						<InputForm
							type='text'
							name='name'
							label='Họ tên đầy đủ'
							placeholder='Nhập họ tên đầy đủ'
							textRequired='Vui lòng nhập họ và tên'
							iconInput={<SecurityUser />}
							onClean
							showDone
							isRequired
						/>
					</div>
					<div className={styles.col_2}>
						<InputForm
							type='text'
							name='username'
							placeholder='Nhập tên đăng nhập'
							iconInput={<UserTick />}
							label='Tên đăng nhập'
							textRequired='Vui lòng nhập tên đăng nhập'
							onClean
							showDone
							isRequired
						/>

						<div className={styles.inputElement}>
							<label className={styles.label}>
								Giới tính <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.groupInputRadio}>
								<label className={styles.groupRadio}>
									<input
										onChange={handleChange}
										type='radio'
										value={GENDER.NAM}
										name='genderId'
										checked={form.genderId == 1}
									/>
									<p>Nam</p>
								</label>
								<label className={styles.groupRadio}>
									<input
										onChange={handleChange}
										type='radio'
										value={GENDER.NU}
										name='genderId'
										checked={form.genderId == 2}
									/>
									<p>Nữ</p>
								</label>
								<label className={styles.groupRadio}>
									<input
										onChange={handleChange}
										type='radio'
										value={GENDER.KHAC}
										name='genderId'
										checked={form.genderId == 3}
									/>
									<p>Giới tính khác</p>
								</label>
							</div>
						</div>
					</div>
					<div className={styles.col_3}>
						<Select
							label='Ngày sinh'
							placeholder='Ngày sinh'
							name='date'
							onChange={handleChange}
							value={form.date}
						>
							<Option title='1' value={1} />
						</Select>

						<Select
							label='Tháng sinh'
							placeholder='Tháng sinh'
							name='month'
							onChange={handleChange}
							value={form.month}
						>
							<Option title='1' value={1} />
						</Select>

						<Select
							label='Năm sinh'
							placeholder='Năm sinh'
							name='year'
							onChange={handleChange}
							value={form.year}
						>
							<Option title='1' value={1} />
						</Select>
					</div>
					<div className={styles.col_2}>
						<InputForm
							name='phone'
							placeholder='Nhập số điện thoại'
							iconInput={<CallIncoming />}
							isPhone
							isRequired
							onClean
							showDone
							label='Số điện thoại'
							type='number'
							textRequired='Vui lòng nhập số điện thoại'
						/>
						<div>
							<InputForm
								name='email'
								placeholder='Nhập email'
								iconInput={<DirectboxNotif />}
								isEmail
								isRequired
								onClean
								showDone
								label='Email của bạn'
								type='text'
								textRequired='Vui lòng nhập địa chỉ email'
							/>
						</div>
					</div>
				</div>

				<div className={styles.box_btn}>
					<div className={styles.list_btn}>
						<Button rounded_8>Hủy</Button>
						<Button secondary rounded_8>
							Chỉnh sửa
						</Button>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default MainProfile;
