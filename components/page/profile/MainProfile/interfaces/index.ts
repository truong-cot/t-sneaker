export interface PropsMainProfile {}

export interface IUser {
	_id: string;
	accountName: string;
	account: {
		_id: string;
		account: string;
		email: string;
		isAdmin: boolean;
	} | null;
	avatar: string | null;
	fullname: string;
	gender: {
		id: number | null;
		name: string | null;
	} | null;
	dateOfBirth: Date | null;
	phone: string | null;
	email: string;
	createdAt?: Date | null;
	updatedAt?: Date | null;
	file: string;
	imageBase64: string;
}
