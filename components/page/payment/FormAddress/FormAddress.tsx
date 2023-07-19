import clsx from 'clsx';
import axios from 'axios';
import {useRouter} from 'next/router';
import {FiChevronDown} from 'react-icons/fi';
import React, {useEffect, useState} from 'react';

import {PropsFormAddress} from './interfaces';
import {PATHS} from '~/constants/mocks/paths';
import {removeVietnameseTones} from '~/common/func/optionConvert';
import styles from './FormAddress.module.scss';

function FormAddress({address, setAddress}: PropsFormAddress) {
	const router = useRouter();

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
		Array<{
			id: number | null;
			name: string;
		}>
	>([]);
	const [districts, setDistricts] = useState<
		Array<{
			id: number | null;
			name: string;
		}>
	>([]);
	const [wards, setWards] = useState<
		Array<{
			id: number | null;
			name: string;
		}>
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
		if (address.province.id) {
			(async () => {
				const res = await axios.get(`${PATHS.DISTRICTS}/${address.province.id}.json`);
				if (res) {
					setDistricts(res.data.data);
				}
			})();
		} else {
			setDistricts([]);
		}
	}, [router, address.province.id]);

	// Gọi api lấy xã phường
	useEffect(() => {
		if (address.district.id) {
			(async () => {
				const res = await axios.get(`${PATHS.WARDS}/${address.district.id}.json`);
				if (res) {
					setWards(res.data.data);
				}
			})();
		} else {
			setWards([]);
		}
	}, [router, address.district.id]);

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Thông tin người nhận hàng</h4>
			<div className={styles.form}>
				<div className={styles.col_2}>
					<div className={styles.item}>
						<p className={styles.lable}>
							Họ tên người nhận: <span style={{color: 'red'}}>*</span>
						</p>
						<input type='text' placeholder='Họ tên người nhận hàng' className={styles.input} />
					</div>
					<div className={styles.item}>
						<p className={styles.lable}>
							Số điện thoại người nhận hàng: <span style={{color: 'red'}}>*</span>
						</p>
						<input type='number' placeholder='Số điện thoại người nhận hàng' className={styles.input} />
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
							<p className={styles.text}>{address?.province?.name || 'Tỉnh, thành phố'}</p>
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
														[styles.active]: address?.province?.id == v.id,
													})}
													onClick={() => {
														setOpenProvince(false);
														setAddress((prev: any) => ({
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
							<p className={styles.text}>{address?.district?.name || 'Quận / Huyện'}</p>
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
										placeholder='Tìm kiếm thành phố'
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
														[styles.active]: address?.district?.id == v.id,
													})}
													onClick={() => {
														setOpenDistrict(false);
														setAddress((prev: any) => ({
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
							<p className={styles.text}>{address?.ward?.name || 'Xã, phường'}</p>
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
										placeholder='Tìm kiếm thành phố'
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
														[styles.active]: address?.ward?.id == v.id,
													})}
													onClick={() => {
														setOpenWard(false);
														setAddress((prev: any) => ({
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
						<input type='text' placeholder='Địa chỉ cụ thể' className={styles.input} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormAddress;
