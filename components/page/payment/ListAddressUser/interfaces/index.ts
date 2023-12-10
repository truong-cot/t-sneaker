import {IAddress} from '~/components/page/profile/MainListAddress/interfaces';

export interface PropsListAddressUser {
	listAddress: IAddress[];
	onCLoseListAddress: () => void;
}
