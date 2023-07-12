import {TypeCart} from '~/constants/mocks/data';

export interface PropsCartItem {
	data: TypeCart;
	plusNumber: (id: string) => void;
	minusNumber: (id: string) => void;
	deleteCart: (id: string) => void;
}
