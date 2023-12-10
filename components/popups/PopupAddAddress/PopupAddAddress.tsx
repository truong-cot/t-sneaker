import {useRouter} from 'next/router';
import styles from './PopupAddAddress.module.scss';
import {IInfoForm, PropsPopupAddAddress} from './interfaces';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {PATHS} from '~/constants/mocks/paths';
import clsx from 'clsx';
import {removeVietnameseTones} from '~/common/func/optionConvert';
import {FiChevronDown} from 'react-icons/fi';
import Button from '~/components/controls/Button/Button';
import {IoClose} from 'react-icons/io5';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingScreen from '~/components/protected/LoadingScreen';
import {toastWarn} from '~/common/func/toast';
import {httpRequest} from '~/services';
import addressServices from '~/services/addressServices';

function PopupAddAddress({onClose}: PropsPopupAddAddress) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [infoForm, setInfoForm] = useState<IInfoForm>({
		nameReceiver: '',
		phoneReceiver: '',
		province: {
			id: null,
			name: '',
		},
		district: {
			id: null,
			name: '',
		},
		ward: {
			id: null,
			name: '',
		},
		specific: '',
	});

	const [loading, setLoading] = useState<boolean>(false);

	// Keyword search list
	const [_q_province, set_q_province] = useState<string>('');
	const [_q_district, set_q_district] = useState<string>('');
	const [_q_ward, set_q_ward] = useState<string>('');

	// State open box
	const [openProvince, setOpenProvince] = useState<boolean>(false);
	const [openDistrict, setOpenDistrict] = useState<boolean>(false);
	const [openWard, setOpenWard] = useState<boolean>(false);

	// State list
	const [provinces, setProvinces] = useState<
		{
			id: number | null;
			name: string;
		}[]
	>([]);
	const [districts, setDistricts] = useState<
		{
			id: number | null;
			name: string;
		}[]
	>([]);
	const [wards, setWards] = useState<
		{
			id: number | null;
			name: string;
		}[]
	>([]);

	// Gọi api lấy tỉnh thành
	useEffect(() => {
		(async () => {
			const res = await axios.get(PATHS.PROVINCE);
			if (res) {
				setProvinces(res.data.data);
			}
		})();
	}, [router]);

	// Gọi api lấy tỉnh thành
	useEffect(() => {
		if (infoForm.province.id) {
			(async () => {
				const res = await axios.get(`${PATHS.DISTRICTS}/${infoForm.province.id}.json`);
				if (res) {
					setDistricts(res.data.data);
				}
			})();
		} else {
			setDistricts([]);
		}
	}, [router, infoForm.province.id]);

	// Gọi api lấy xã phường
	useEffect(() => {
		if (infoForm.district.id) {
			(async () => {
				const res = await axios.get(`${PATHS.WARDS}/${infoForm.district.id}.json`);
				if (res) {
					setWards(res.data.data);
				}
			})();
		} else {
			setWards([]);
		}
	}, [router, infoForm.district.id]);

	const handleAddAddress = () => {
		const regexPhone =
			/^(\+84|84|0)(1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|7[0-9]|8[0-9]|70|56|58|59|9[0-9]|86|88|89)([0-9]{7})$/;

		if (!token) {
			return toastWarn({msg: 'Bạn chưa đăng nhập!'});
		}
		if (!infoForm?.nameReceiver) {
			return toastWarn({msg: 'Nhập tên người nhận!'});
		}
		if (!infoForm?.phoneReceiver) {
			return toastWarn({msg: 'Nhập số điện thoại người nhận!'});
		}
		if (regexPhone.test(infoForm?.phoneReceiver) == false) {
			return toastWarn({msg: 'Số điện thoại không hợp lệ!'});
		}
		if (!infoForm?.province?.name || !infoForm?.district?.name || !infoForm?.ward?.name || !infoForm?.specific) {
			return toastWarn({msg: 'Nhập đầy đủ địa chỉ!'});
		}

		httpRequest({
			setLoading: setLoading,
			showMessage: true,
			http: addressServices.createAddress({
				token: token!,
				nameReceiver: infoForm?.nameReceiver,
				phoneReceiver: infoForm?.phoneReceiver,
				address: `${infoForm?.specific}, ${infoForm?.ward?.name}, ${infoForm?.district?.name}, ${infoForm?.province?.name}`,
				userId: infoUser?._id!,
			}),
		}).then((data) => {
			if (data) {
				onClose();
				setInfoForm({
					nameReceiver: '',
					phoneReceiver: '',
					province: {
						id: null,
						name: '',
					},
					district: {
						id: null,
						name: '',
					},
					ward: {
						id: null,
						name: '',
					},
					specific: '',
				});
				router.replace(router.pathname, undefined, {scroll: false, shallow: false});
			}
		});
	};

	return (
		<div className={clsx(styles.container, 'effectZoom')}>
			<LoadingScreen isLoading={loading} />
			<h4 className={styles.title}>Thêm thông tin nhận hàng</h4>
			<div className={styles.form}>
				<div className={styles.col_2}>
					<div className={styles.item}>
						<p className={styles.lable}>
							Họ tên người nhận: <span style={{color: 'red'}}>*</span>
						</p>
						<input
							type='text'
							placeholder='Họ tên người nhận hàng'
							className={styles.input}
							value={infoForm?.nameReceiver}
							onChange={(e) =>
								setInfoForm((prev) => ({
									...prev,
									nameReceiver: e.target.value,
								}))
							}
						/>
					</div>
					<div className={styles.item}>
						<p className={styles.lable}>
							Số điện thoại người nhận hàng: <span style={{color: 'red'}}>*</span>
						</p>
						<input
							type='number'
							placeholder='Số điện thoại người nhận hàng'
							className={styles.input}
							value={infoForm?.phoneReceiver}
							onChange={(e) =>
								setInfoForm((prev) => ({
									...prev,
									phoneReceiver: e.target.value,
								}))
							}
						/>
					</div>
				</div>

				<div className={styles.col_3}>
					<div className={styles.item}>
						<p className={styles.lable}>
							Tỉnh / Thành phố: <span style={{color: 'red'}}>*</span>
						</p>
						<div
							className={styles.select}
							onClick={() => {
								setOpenProvince(!openProvince);
								setOpenDistrict(false);
								setOpenWard(false);
							}}
						>
							<p className={styles.text}>{infoForm?.province?.name || 'Tỉnh, thành phố'}</p>
							<div
								className={clsx(styles.icon, {
									[styles.active_icon]: openProvince,
								})}
							>
								<FiChevronDown size={20} color='rgba(0, 0, 0, 0.88)' />
							</div>
							{openProvince && (
								<div className={styles.list}>
									<input
										type='text'
										placeholder='Tìm kiếm thành phố'
										className={styles.input_search}
										value={_q_province}
										autoFocus={openProvince}
										onChange={(e: any) => set_q_province(e.target.value)}
										onClick={(e) => {
											setOpenProvince(true);
											e.stopPropagation();
										}}
									/>

									<div className={styles.main_list}>
										{provinces
											.filter((v) =>
												removeVietnameseTones(v.name).includes(
													_q_province ? removeVietnameseTones(_q_province) : ''
												)
											)
											.map((v) => (
												<div
													key={v.id}
													className={clsx(styles.item_address, {
														[styles.active]: infoForm?.province?.id == v.id,
													})}
													onClick={() => {
														setOpenProvince(false);
														setInfoForm((prev: any) => ({
															...prev,
															province: {
																id: v.id,
																name: v.name,
															},
															district: {
																id: null,
																name: '',
															},
															ward: {
																id: null,
																name: '',
															},
														}));
													}}
												>
													<p className={styles.text_address}>{v.name}</p>
												</div>
											))}
									</div>
								</div>
							)}
						</div>
					</div>

					<div className={styles.item}>
						<p className={styles.lable}>
							Quận / Huyện: <span style={{color: 'red'}}>*</span>
						</p>
						<div
							className={styles.select}
							onClick={() => {
								setOpenDistrict(!openDistrict);
								setOpenProvince(false);
								setOpenWard(false);
							}}
						>
							<p className={styles.text}>{infoForm?.district?.name || 'Quận / Huyện'}</p>
							<div
								className={clsx(styles.icon, {
									[styles.active_icon]: openDistrict,
								})}
							>
								<FiChevronDown size={20} color='rgba(0, 0, 0, 0.88)' />
							</div>
							{openDistrict && (
								<div className={styles.list}>
									<input
										type='text'
										placeholder='Tìm kiếm quận/huyện'
										className={styles.input_search}
										value={_q_district}
										autoFocus={openDistrict}
										onChange={(e: any) => set_q_district(e.target.value)}
										onClick={(e) => {
											setOpenDistrict(true);
											e.stopPropagation();
										}}
									/>

									<div className={styles.main_list}>
										{districts
											.filter((v) =>
												removeVietnameseTones(v.name).includes(
													_q_district ? removeVietnameseTones(_q_district) : ''
												)
											)
											.map((v) => (
												<div
													key={v.id}
													className={clsx(styles.item_address, {
														[styles.active]: infoForm?.district?.id == v.id,
													})}
													onClick={() => {
														setOpenDistrict(false);
														setInfoForm((prev: any) => ({
															...prev,
															district: {
																id: v.id,
																name: v.name,
															},
															ward: {
																id: null,
																name: '',
															},
														}));
													}}
												>
													<p className={styles.text_address}>{v.name}</p>
												</div>
											))}
									</div>
								</div>
							)}
						</div>
					</div>
					<div className={styles.item}>
						<p className={styles.lable}>
							Xã / Phường: <span style={{color: 'red'}}>*</span>
						</p>
						<div
							className={styles.select}
							onClick={() => {
								setOpenWard(!openWard);
								setOpenProvince(false);
								setOpenDistrict(false);
							}}
						>
							<p className={styles.text}>{infoForm?.ward?.name || 'Xã, phường'}</p>
							<div
								className={clsx(styles.icon, {
									[styles.active_icon]: openWard,
								})}
							>
								<FiChevronDown size={20} color='rgba(0, 0, 0, 0.88)' />
							</div>
							{openWard && (
								<div className={styles.list}>
									<input
										type='text'
										placeholder='Tìm kiếm xã/phường'
										className={styles.input_search}
										value={_q_ward}
										autoFocus={openWard}
										onChange={(e: any) => set_q_ward(e.target.value)}
										onClick={(e) => {
											setOpenWard(true);
											e.stopPropagation();
										}}
									/>

									<div className={styles.main_list}>
										{wards
											.filter((v) =>
												removeVietnameseTones(v.name).includes(
													_q_ward ? removeVietnameseTones(_q_ward) : ''
												)
											)
											.map((v) => (
												<div
													key={v.id}
													className={clsx(styles.item_address, {
														[styles.active]: infoForm?.ward?.id == v.id,
													})}
													onClick={() => {
														setOpenWard(false);
														setInfoForm((prev: any) => ({
															...prev,
															ward: {
																id: v.id,
																name: v.name,
															},
														}));
													}}
												>
													<p className={styles.text_address}>{v.name}</p>
												</div>
											))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className={styles.col_1}>
					<div className={styles.item}>
						<p className={styles.lable}>
							Địa chỉ cụ thể: <span style={{color: 'red'}}>*</span>
						</p>
						<input
							type='text'
							placeholder='Địa chỉ cụ thể'
							className={styles.input}
							value={infoForm?.specific}
							onChange={(e) =>
								setInfoForm((prev) => ({
									...prev,
									specific: e.target.value,
								}))
							}
						/>
					</div>
				</div>
			</div>

			<div className={styles.box_btn}>
				<div className={styles.list_btn}>
					<Button purple rounded_8 onClick={onClose}>
						Hủy
					</Button>
					<Button secondary rounded_8 onClick={handleAddAddress}>
						Thêm thông tin
					</Button>
				</div>
			</div>

			<div className={styles.close} onClick={onClose}>
				<IoClose size={24} />
			</div>
		</div>
	);
}

export default PopupAddAddress;
