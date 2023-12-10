import axiosClient from '.';

const router = 'order';

const orderServices = {
	createOrder: (
		data: {
			token: string;
			userId: string;
			nameReceiver: string;
			phoneReceiver: string;
			address: string;
			transportId: string;
			note: string;
			listProduct: {
				idCart?: string;
				productId: string;
				nameProduct: string;
				price: number;
				sale: number;
				quality: number;
				sizeId: string;
			}[];
			totalPriceCart: number;
			priceShipping: number;
			discount: number;
			totalOrder: number;
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
	getListOrderUser: (
		data: {
			token: string;
			userId: string;
			statusOrder: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/list-order-user`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
	cancelOrder: (
		data: {
			token: string;
			idOrder: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/cancel-order`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},

	deleteOrder: (
		data: {
			token: string;
			idOrder: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(`/${router}/delete-order?idOrder=${data.idOrder}`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},

	successOrder: (
		data: {
			token: string;
			idOrder: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/success-order`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default orderServices;
