export interface PropsPopupAddAddress {
	onClose: () => void;
}

export interface IInfoForm {
	nameReceiver: string;
	phoneReceiver: string;
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
