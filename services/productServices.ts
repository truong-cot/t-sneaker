import axiosClient from '.';

const router = 'product';

const productServices = {
	getList: (
		data: {
			token: string;
			keyword: string;
			page: number | null;
			limit: number | null;
			categoryId: string;
			statusId: string;
			priceFrom: number | null;
			priceTo: number | null;
			sort?: {
				sortList: number | null;
				sortType: number | null;
			};
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
	getDetail: (
		data: {
			token: string;
			idProduct: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/get-detail?idProduct=${data.idProduct}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	getBestSellers: (data: {}, tokenAxios?: any) => {
		return axiosClient.get(`/${router}/get-best-sellers`, {
			cancelToken: tokenAxios,
		});
	},
	getNewProducts: (data: {}, tokenAxios?: any) => {
		return axiosClient.get(`/${router}/get-new-product`, {
			cancelToken: tokenAxios,
		});
	},
	getSaleProducts: (data: {}, tokenAxios?: any) => {
		return axiosClient.get(`/${router}/get-sale-product`, {
			cancelToken: tokenAxios,
		});
	},
};

export default productServices;
