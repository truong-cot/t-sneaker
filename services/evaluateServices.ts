import axiosClient from '.';

const router = 'evaluate';

const evaluateServices = {
	createEvaluate: (
		data: {
			token: string;
			user: string;
			product: string;
			numberStar: number;
			content: string;
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
	getEvaluateByProduct: (
		data: {
			token: string;
			productId: string;
			page: number | null;
			limit: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/get-list-by-product`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default evaluateServices;
