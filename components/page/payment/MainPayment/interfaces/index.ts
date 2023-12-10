export interface PropsMainPayment {}

export interface PropsAddress {
	province: {
		id: number | null;
		name: string;
	};
	district: {
		id: number | null;
		name: string;
	};
	ward: {
		id: number | null;
		name: string;
	};
	specific: string;
}
