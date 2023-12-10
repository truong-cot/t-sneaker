import axiosClient from '.';

const router = 'address';

const addressServices = {
	createAddress: (
		data: {
			token: string;
			userId: string;
			nameReceiver: string;
			phoneReceiver: string;
			address: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/create`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	getAddress: (
		data: {
			token: string;
			userId: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/get-address?userId=${data.userId}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	deleteAddress: (
		data: {
			token: string;
			idAddress: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(`/${router}/delete-address?idAddress=${data.idAddress}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	setDefaultAddress: (
		data: {
			token: string;
			idAddress: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/set-default-address`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default addressServices;
