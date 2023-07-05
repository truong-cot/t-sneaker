import {
	toastError,
	toastInfo,
	toastSuccess,
	toastWarn,
} from '~/common/func/toast';

import axios from 'axios';
import {delay} from '~/common/func/delay';

const axiosClient = axios.create({
	headers: {'Content-Type': 'application/json'},
	baseURL: 'https://192.168.0.174:6001/api',
	// paramsSerializer: (params: any) => queryString.stringify(params),
	timeout: 15000,
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
			throw error.response.data;
		}

		if (!axios.isCancel(error)) throw error;
	}
);

export default axiosClient;

export const httpRequest = async ({
	http,
	dispatch,
	setLoading,
	setError,
	msgSuccess = 'Thành công',
	showMessage = false,
	onError,
}: {
	http: any;
	dispatch?: any;
	setLoading?: (any: any) => void;
	setError?: (any: any) => void;
	onError?: () => void;
	showMessage?: boolean;
	msgSuccess?: string;
}) => {
	setLoading && setLoading(() => true);
	try {
		// await delay(500);
		const res: any = await http;

		if (res.error.code === 0) {
			showMessage &&
				msgSuccess &&
				toastSuccess({msg: msgSuccess && res?.error?.message});
			setLoading && setLoading(() => false);
			return res?.data || true;
		} else {
			setLoading && setLoading(() => false);
			onError && onError();
			throw res?.error?.message;
		}
	} catch (err: any) {
		if (!!dispatch && err?.error?.code === 401) {
			showMessage && toastError({msg: 'Hết hạn đăng nhập'});
			// setLoading && setLoading(() => false);
		} else if (typeof err == 'string') {
			showMessage && toastWarn({msg: err || 'Có lỗi đã xảy ra'});
			setLoading && setLoading(() => false);
		} else if (err.code == 'ERR_NETWORK' || err.code == 'ECONNABORTED') {
			showMessage && toastInfo({msg: 'Kiểm tra kết nối internet'});
			setLoading && setLoading(() => false);
		}
		if (setError) {
			setError(err);
		}
	}
};
