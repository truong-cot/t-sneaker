import axiosClient from '.';

const router = 'banner';

const bannerServices = {
	// Lấy danh sách sản phẩm
	getBanners: (
		data: {
			page: number | null;
			limit: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/get-banner?page=${data.page}&limit=${data.limit}`, {
			cancelToken: tokenAxios,
		});
	},
};

export default bannerServices;
