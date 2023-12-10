import {createContext} from 'react';
import {ICart} from '../MainListCart/interfaces';

export interface TypeContext {
	listCart: ICart[];
	setListCart: (any: any) => void;
	totalPriceCart: number;
	discount: number;
	setDiscount: (number: number) => void;
}

export const ContextCart = createContext<TypeContext>({
	listCart: [],
	setListCart: () => null,
	totalPriceCart: 0,
	discount: 0,
	setDiscount: () => 0,
});
