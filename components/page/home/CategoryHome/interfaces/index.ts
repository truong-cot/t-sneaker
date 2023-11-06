export interface PropsCategoryHome {}
export interface ICategory {
	_id: string;
	uuid: string;
	name: string;
	image: string;
	createdAt: string | null;
	updatedAt: string | null;
	productCount: number;
}
