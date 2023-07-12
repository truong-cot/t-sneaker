import {createContext} from 'react';
import {TypeCart} from '~/constants/mocks/data';

export interface TypeContextPayment {
	data: {
		freeShipping: number;
		temporaryPrice: number;
		listProduct: TypeCart[];
	};
}

export const ContextPayment = createContext<TypeContextPayment>({
	data: {
		freeShipping: 0,
		temporaryPrice: 0,
		listProduct: [],
	},
});
