export interface PropsMainProfile {}

export interface IUser {
	_id: string;
	uuid: string;
	uuidAccount: string;
	avatar: string | null;
	fullname: string;
	account: string;
	gender: {
		id: number | null;
		name: string | null;
	} | null;
	dateOfBirth: Date | null;
	phone: string | null;
	email: string;
	file: string;
	imageBase64: string;
	createdAt?: string;
	updatedAt?: string;
}
