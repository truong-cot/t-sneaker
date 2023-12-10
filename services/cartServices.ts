import axiosClient from '.';

const router = 'cart';

const cartServices = {
	createCart: (
		data: {
			token: string;
			userId: string;
			productId: string;
			sizeId: string;
			quality: number;
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
	getListCart: (
		data: {
			token: string;
			userId: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/get-list?userId=${data.userId}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	deleteCart: (
		data: {
			token: string;
			cartId: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(`/${router}/delete-cart?cartId=${data.cartId}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default cartServices;
