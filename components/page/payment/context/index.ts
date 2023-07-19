import {createContext} from 'react';
import {TypeCart} from '~/constants/mocks/data';
import {PropsAddress} from '../MainPayment/interfaces';

export interface TypeContextPayment {
	data: {
		freeShipping: number;
		temporaryPrice: number;
		listProduct: TypeCart[];
	};
	address: PropsAddress;
	setAddress: (any: any) => void;
}

export const ContextPayment = createContext<any>(null);
