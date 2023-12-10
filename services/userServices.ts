import axiosClient from '.';

const router = 'user';

const userServices = {
	getDetail: (
		data: {
			token: string;
			userId: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/get-detail?userId=${data.userId}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	updateUser: (
		data: {
			token: string;
			userId: string;
			avatar: string;
			fullname: string;
			gender: {
				id: number | null;
				name: string | null;
			};
			dateOfBirth: Date | null;
			phone: string;
			email: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/update`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default userServices;
