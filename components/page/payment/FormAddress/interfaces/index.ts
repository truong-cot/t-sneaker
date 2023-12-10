import {PropsAddress} from '../../MainPayment/interfaces';

export interface PropsFormAddress {
	infoReceiver: {
		name: string;
		phone: string;
		note: string;
	};
	setInfoReceiver: (any: any) => void;
	address: PropsAddress;
	setAddress: (any: any) => void;
}
