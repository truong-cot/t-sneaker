import {IAddress} from '~/components/page/profile/MainListAddress/interfaces';
import {PropsAddress} from '../../MainPayment/interfaces';

export interface PropsAddressDelivery {
	listAddress: IAddress[];
	infoReceiver: {
		name: string;
		phone: string;
		note: string;
	};
	setInfoReceiver: (any: any) => void;
}
