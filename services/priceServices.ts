import axiosClient from '.';

const router = 'price';

const priceServices = {
	createPrice: (
		data: {
			token: string;
			priceFrom: number;
			priceTo: number;
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
	getList: (
		data: {
			token: string;
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
	deletePrice: (
		data: {
			token: string;
			idPrice: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(`/${router}/delete-price?idPrice=${data.idPrice}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default priceServices;
