export interface PropsItemCart {
	data: {
		_id: string;
		userId: string;
		productId: {
			_id: string;
			name: string;
			images: string[];
			sale: number;
			price: number;
		};
		sizeId: {
			_id: string;
			size: number;
			description: string;
		};
		quality: number;
		createdAt: string;
		updatedAt: string;
	};
}
