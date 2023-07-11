export interface PropsCartItem {
	data: {
		id: string;
		image: string;
		name: string;
		qlt: number;
		sale: number;
		unitPrice: number;
	};
	plusNumber: (id: string) => void;
	minusNumber: (id: string) => void;
	deleteCart: (id: string) => void;
}
