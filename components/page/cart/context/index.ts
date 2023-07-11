import {createContext} from 'react';
import {TypeCart} from '~/constants/mocks/data';

export interface TypeContext {
	listCart: TypeCart[];
	setListCart: (any: any) => void;
	totalPriceChosseCart: number;
}

export const ContextCart = createContext<TypeContext>({
	listCart: [],
	setListCart: () => null,
	totalPriceChosseCart: 0,
});
