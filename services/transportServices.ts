import axiosClient from '.';

const router = 'transport';

const transportServices = {
	getList: (
		data: {
			token: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/get-list`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default transportServices;
