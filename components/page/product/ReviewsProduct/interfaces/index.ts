export interface PropsReviewsProduct {}

export interface IDateEvaluate {
	count: number;
	averageRating: string;
	items: {
		_id: string;
		user: {
			_id: string;
			avatar: string | null;
			fullname: string;
			gender: {
				id: number | null;
				name: string | null;
			};
		};
		product: string;
		numberStar: number;
		content: string;
		createdAt: string;
		updatedAt: string;
	}[];
}
