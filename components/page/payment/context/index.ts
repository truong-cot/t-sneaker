import {createContext} from 'react';
import {PropsAddress} from '../MainPayment/interfaces';
import {ICart} from '../../cart/MainListCart/interfaces';
import {IAddress} from '../../profile/MainListAddress/interfaces';

export interface TypeContextPayment {
	data: {
		discount: number;
		listProduct: ICart[];
		totalPriceCart: number;
	};
	transportId: string;
	setTransportId: (any: string) => void;
	infoReceiver: {
		name: string;
		phone: string;
		note: string;
	};
	setInfoReceiver: (any: any) => void;
	address: PropsAddress | null;
	setAddress: (any: any) => void;
	priceShipping: number;
	setPriceShipping: (any: number) => void;
	addressUser: IAddress | null;
	setAddressUser: (any: any) => void;
}

export const ContextPayment = createContext<TypeContextPayment>({
	data: {
		discount: 0,
		listProduct: [],
		totalPriceCart: 0,
	},
	transportId: '',
	setTransportId: () => null,
	infoReceiver: {
		name: '',
		phone: '',
		note: '',
	},
	setInfoReceiver: () => null,
	address: null,
	setAddress: () => null,
	priceShipping: 0,
	setPriceShipping: (any: number) => null,
	addressUser: null,
	setAddressUser: () => null,
});
