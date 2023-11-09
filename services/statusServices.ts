import axiosClient from '.';

const router = 'status';

const statusServices = {
	createStatus: (
		data: {
			token: string;
			name: string;
			description: string;
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
	updateStatus: (
		data: {
			token: string;
			name: string;
			description: string;
			idStatus: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/update-status?idStatus=${data.idStatus}`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	getDetail: (
		data: {
			token: string;
			idStatus: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/get-detail?idStatus=${data.idStatus}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	getList: (
		data: {
			token: string;
			keyword: string;
			page: number | null;
			limit: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/get-list`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	deleteStatus: (
		data: {
			token: string;
			idStatus: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(`/${router}/delete-status?idStatus=${data.idStatus}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default statusServices;
