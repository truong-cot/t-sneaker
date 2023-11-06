import axiosClient from '.';

const router = 'category';

const categoryServices = {
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
};

export default categoryServices;
