import axiosClient from '.';

const router = 'upload';

const uploadFileService = {
	// upload ảnh
	singleFile: (data: any, tokenAxios?: any) => {
		return axiosClient.post(`${router}/upload-single-file`, data, {
			cancelToken: tokenAxios,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},

	// upload mutil ảnh
	multipleFile: (data: any, tokenAxios?: any) => {
		return axiosClient.post(`${router}/upload-multiple-file`, data.formData, {
			cancelToken: tokenAxios,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};

export default uploadFileService;
