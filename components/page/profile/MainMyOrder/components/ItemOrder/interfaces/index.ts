export interface TypeOrder {
	_id: string;
	userId: string;
	nameReceiver: string;
	phoneReceiver: string;
	address: string;
	transportId: {
		_id: string;
		name: string;
		price: number;
	};
	note: string;
	listProduct: {
		_id: string;
		idCart: string;
		productId: {
			_id: string;
			name: string;
			images: string[];
		};
		nameProduct: string;
		price: number;
		sale: number;
		quality: number;
		sizeId: {
			_id: string;
			size: number;
			description: string;
		};
	}[];
	totalPriceCart: number;
	discount: number;
	totalOrder: number;
	statusOrder: number;
	createdAt: string;
	updatedAt: string;
}

export interface TypeProductOrder {
	data: TypeOrder;
}
