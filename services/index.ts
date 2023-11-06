import {toastInfo, toastSuccess, toastWarn} from '~/common/func/toast';

import axios from 'axios';
import {ERROR_CODE} from '~/constants/mocks/enum';
import {delay} from '~/common/func/delay';
import {store} from '~/redux/store';
import {setStateLogin, setToken} from '~/redux/reducer/auth';
import {setInfoUser, setUuidAccount, setUuidUser} from '~/redux/reducer/user';

// Cấu hình axios
const axiosClient = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
	baseURL:
		process.env.NODE_ENV == 'development'
			? process.env.NEXT_PUBLIC_API_URL_DEV
			: process.env.NEXT_PUBLIC_API_URL_PRODUCTION,
	timeout: 50000,
	timeoutErrorMessage: 'Timeout error request',
});

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

axiosClient.interceptors.response.use(
	(response: any) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error: any) => {
		if (error.response && error.response.data) {
			throw error.response;
		}

		if (!axios.isCancel(error)) throw error;
	}
);

export default axiosClient;

export const httpRequest = async ({
	http,
	setLoading,
	msgSuccess = 'Thành công',
	showMessage = false,
	timeDelay = 500,
}: {
	http: any;
	setLoading?: (any: any) => void;
	showMessage?: boolean;
	msgSuccess?: string;
	timeDelay?: number;
}) => {
	// Bắt đầu call api
	setLoading && setLoading(() => true);

	try {
		// Delay
		timeDelay && (await delay(timeDelay));

		// Bắt đầu gọi
		const res: any = await http;

		// Gọi xong ===> Thành công
		if (res.error.code === ERROR_CODE.THANH_CONG) {
			showMessage && msgSuccess && toastSuccess({msg: msgSuccess && res?.error?.message});
			setLoading && setLoading(() => false);
			return res?.data || true;
		} else {
			setLoading && setLoading(() => false);
			throw res?.error?.message;
		}

		// ===> Có lỗi
	} catch (err: any) {
		// Code 401, 403 ===> Authorization
		if (err?.status == 401 || err?.status == 403) {
			// redirect login
			store.dispatch(setToken(null));
			store.dispatch(setStateLogin(false));
			store.dispatch(setInfoUser(null));
			store.dispatch(setUuidUser(null));
			store.dispatch(setUuidAccount(null));
		}
		// Mất mạng
		else if (err.code == 'ERR_NETWORK' || err.code == 'ECONNABORTED') {
			setLoading && setLoading(() => false);
			showMessage && toastInfo({msg: 'Kiểm tra kết nối internet'});
		}
		// Lỗi trả về từ server
		else {
			setLoading && setLoading(() => false);
			showMessage && toastWarn({msg: err?.data?.error?.message || 'Có lỗi đã xảy ra'});
		}
		// ===> Gọi xong
	} finally {
		setLoading && setLoading(() => false);
	}
};
