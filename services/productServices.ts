import axiosClient from '.';

const router = 'Product';

const productServices = {
	// Lấy danh sách sản phẩm
	getAllProduct: (
		data: {
			page: number;
			limit: number;
			keyWord: string;
			categoryUuids: Array<string>;
			pricePrev: number;
			priceNext: number;
			status: Array<number>;
			sortBy: {
				type: number;
				sort: boolean;
			};
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/Gets`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default productServices;
