export interface PropsMainProduct {}

export interface IData {
	numberReview: number;
	averageRating: number;
	quantitySold: number;
	_id: string;
	name: string;
	images: string[];
	sale: number;
	price: number;
	mainDescription: 'Mô tả chỉnh';
	detailDescription: '<p>Mô tả chi tiết.</p>';
	categoryId: ICategory;
	sizes: ISize[];
	statuses: IStatus[];
	createdAt: string;
	updatedAt: string;
}

export interface ICategory {
	_id: string;
	uuid: string;
	name: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}

export interface ISize {
	sizeId: {
		_id: string;
		size: number;
		description: string;
		createdAt: string;
		updatedAt: string;
	};
	quantity: number;
	_id: string;
}

export interface IStatus {
	statusId: {
		_id: string;
		name: string;
		description: string;
		createdAt: string;
		updatedAt: string;
		__v: 0;
	};
	value: boolean;
	_id: string;
}
