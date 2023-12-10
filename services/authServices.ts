import axiosClient from '.';

const router = 'account';

const authServices = {
	login: (
		data: {
			account: string;
			password: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/login`, data, {
			cancelToken: tokenAxios,
		});
	},
	register: (
		data: {
			fullname: string;
			account: string;
			email: string;
			password: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/register`, data, {
			cancelToken: tokenAxios,
		});
	},
	changePass: (
		data: {
			token: string;
			uuidAccount: string;
			oldPass: string;
			newPass: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/change-pass`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default authServices;
