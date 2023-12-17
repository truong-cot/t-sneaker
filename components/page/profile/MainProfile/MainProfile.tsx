import React, {useCallback, useEffect, useState} from 'react';

import styles from './MainProfile.module.scss';
import {IUser, PropsMainProfile} from './interfaces';
import Form from '~/components/controls/Form/Form';
import clsx from 'clsx';
import {toastError, toastText, toastWarn} from '~/common/func/toast';
import Avatar from './components/Avatar';
import Button from '~/components/controls/Button';
import InputForm from '~/components/controls/Form/components/InputForm/InputForm';
import {CallIncoming, DirectboxNotif, SecurityUser, UserTick} from 'iconsax-react';
import {GENDER} from '~/constants/mocks/enum';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import InputDatePicker from '~/components/controls/InputDatePicker';
import {useRouter} from 'next/router';
import LoadingScreen from '~/components/protected/LoadingScreen';
import uploadFileService from '~/services/uploadService';
import {setInfoUser} from '~/redux/reducer/user';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';

function MainProfile({}: PropsMainProfile) {
	const router = useRouter();
	const dispatch = useDispatch();

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<IUser>({
		_id: '',
		account: null,
		accountName: '',
		avatar: '',
		dateOfBirth: null,
		email: '',
		fullname: '',
		gender: null,
		phone: '',
		file: '',
		imageBase64: '',
	});

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

	useEffect(() => {
		httpRequest({
			setLoading: setLoadingDetail,
			http: userServices.getDetail({
				token: token!,
				userId: infoUser?._id as string,
			}),
		}).then((data) => {
			if (data) {
				setForm({
					...data,
					accountName: data?.account?.account,
					dateOfBirth: data?.dateOfBirth ? new Date(data?.dateOfBirth) : null,
				});
			}
		});
	}, [token, infoUser?._id, router]);

	const handleSubmit = async () => {
		if (!form.fullname) {
			return toastText({msg: 'Tên không được bỏ trống!'});
		}
		if (form?.file) {
			const {file} = form;
			const data: any = new FormData();
			data.append('file', file);
			const {url} = await httpRequest({
				setLoading: setLoading,
				http: uploadFileService.singleFile(data),
			});
			httpRequest({
				setLoading: setLoading,
				showMessage: true,
				http: userServices.updateUser({
					token: token!,
					userId: infoUser?._id as string,
					avatar: url,
					dateOfBirth: new Date(form?.dateOfBirth!),
					email: form?.email,
					fullname: form?.fullname,
					gender: form?.gender!,
					phone: form?.phone!,
				}),
			}).then((data) => {
				if (data) {
					dispatch(
						setInfoUser({
							_id: form?._id,
							account: form?.account!,
							avatar: url,
							dateOfBirth: new Date(form?.dateOfBirth!),
							email: form?.email,
							fullname: form?.fullname,
							gender: form?.gender!,
							phone: form?.phone,
						})
					);
					router.replace(router.pathname, undefined, {
						scroll: false,
						shallow: false,
					});
				}
			});
		} else {
			httpRequest({
				setLoading: setLoading,
				showMessage: true,
				http: userServices.updateUser({
					token: token!,
					userId: infoUser?._id as string,
					avatar: form?.avatar!,
					dateOfBirth: new Date(form?.dateOfBirth!),
					email: form?.email,
					fullname: form?.fullname,
					gender: form?.gender!,
					phone: form?.phone!,
				}),
			}).then((data) => {
				if (data) {
					dispatch(
						setInfoUser({
							_id: form?._id,
							account: form?.account!,
							avatar: form?.avatar,
							dateOfBirth: new Date(form?.dateOfBirth!),
							email: form?.email,
							fullname: form?.fullname,
							gender: form?.gender!,
							phone: form?.phone,
						})
					);
					router.replace(router.pathname, undefined, {
						scroll: false,
						shallow: false,
					});
				}
			});
		}
	};

	return (
		<div className={styles.container}>
			<LoadingScreen isLoading={loading} />
			<DataWrapper data={form ? [1] : []} loading={loadingDetail}>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<div className={clsx(styles.avatar, 'effectShow')}>
						<Avatar src={form?.imageBase64 || form?.avatar} name='avatar' onChange={handleSelectImg} />
						<div className={styles.text}>
							<p>Upload image với dung lượng &lt; 15MB</p>
							<p>Định dạng hỗ trợ: JPG, JPEG, PNG</p>
						</div>
					</div>

					<div className={clsx(styles.form, 'effectShow')}>
						<h3 className={styles.titleGroup}>Thông tin hồ sơ</h3>
						<div className={styles.col_2}>
							<div>
								<InputForm
									type='text'
									name='accountName'
									value={form?.accountName}
									isDisabled
									placeholder='Nhập tên đăng nhập'
									iconInput={<UserTick />}
									label='Tên đăng nhập'
									textRequired='Vui lòng nhập tên đăng nhập'
									onClean
									isRequired
								/>
							</div>
							<InputForm
								type='text'
								label='Họ tên đầy đủ'
								placeholder='Nhập họ tên đầy đủ'
								textRequired='Vui lòng nhập họ và tên'
								iconInput={<SecurityUser />}
								onClean
								isRequired
								name='fullname'
								value={form?.fullname}
							/>
						</div>
						<div className={styles.col_2}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Ngày sinh <span style={{color: 'red'}}>*</span>
								</label>
								<InputDatePicker
									date={form?.dateOfBirth}
									setDate={(date) =>
										setForm((prev) => ({
											...prev,
											dateOfBirth: date,
										}))
									}
									placeholder='Ngày sinh'
								/>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Giới tính <span style={{color: 'red'}}>*</span>
								</label>
								<div className={styles.groupInputRadio}>
									<label className={styles.groupRadio}>
										<input
											type='radio'
											value={GENDER.NAM}
											name='gender'
											checked={form?.gender?.id == 1}
											onChange={(e) =>
												setForm((prev) => ({
													...prev,
													gender: {
														id: 1,
														name: 'Nam',
													},
												}))
											}
										/>
										<p>Nam</p>
									</label>
									<label className={styles.groupRadio}>
										<input
											type='radio'
											value={GENDER.NU}
											name='gender'
											checked={form?.gender?.id == 2}
											onChange={(e) =>
												setForm((prev) => ({
													...prev,
													gender: {
														id: 2,
														name: 'Nữ',
													},
												}))
											}
										/>
										<p>Nữ</p>
									</label>
									<label className={styles.groupRadio}>
										<input
											type='radio'
											value={GENDER.KHAC}
											name='gender'
											checked={form?.gender?.id == 3}
											onChange={(e) =>
												setForm((prev) => ({
													...prev,
													gender: {
														id: 3,
														name: 'Khác',
													},
												}))
											}
										/>
										<p>Giới tính khác</p>
									</label>
								</div>
							</div>
						</div>
						<div className={styles.col_2}>
							<InputForm
								name='phone'
								value={form?.phone}
								placeholder='Nhập số điện thoại'
								iconInput={<CallIncoming />}
								isPhone
								onClean
								label='Số điện thoại'
								type='number'
								textRequired='Vui lòng nhập số điện thoại'
							/>
							<div>
								<InputForm
									name='email'
									value={form?.email}
									placeholder='Nhập email'
									iconInput={<DirectboxNotif />}
									isEmail
									isRequired
									onClean
									label='Email của bạn'
									type='text'
									textRequired='Vui lòng nhập địa chỉ email'
								/>
							</div>
						</div>
					</div>

					<div className={styles.box_btn}>
						<div className={styles.list_btn}>
							<Button w_fit secondary rounded_8>
								Chỉnh sửa
							</Button>
						</div>
					</div>
				</Form>
			</DataWrapper>
		</div>
	);
}

export default MainProfile;
