export interface PropsCartItem {
	data: {
		id: string;
		image: string;
		name: string;
		qlt: number;
		sale: number;
		price: number;
	};
	plusNumber: (id: string) => void;
}
