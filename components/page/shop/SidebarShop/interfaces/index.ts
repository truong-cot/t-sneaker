export interface PropsSidebarShop {}

export interface ICategory {
	_id: string;
	uuid: string;
	name: string;
	image: string;
	createdAt: string | null;
	updatedAt: string | null;
	productCount: number;
}

export interface IStatus {
	_id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}
