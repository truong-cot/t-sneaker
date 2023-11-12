export enum MONEY {
	FREE_00 = 500000,
	FREE_15 = 1500000,
	FREE_25 = 3000000,
}

export enum PRICE_SHIPPING {
	SHIPPING_01 = 15000,
	SHIPPING_02 = 25000,
	SHIPPING_03 = 0,
}

export enum TYPE_ADDRESS {
	NHA_RIENG = 1,
	VAN_PHONG = 2,
}

export enum GENDER {
	NAM = 1,
	NU = 2,
	KHAC = 3,
}

export enum ERROR_CODE {
	THAT_BAI,
	THANH_CONG,
}

export enum ERROR_TEXT {
	THAT_BAI = 'Thất bại',
	THANH_CONG = 'Thành công',
}

export enum STATUS_CODE {
	THANH_CONG = 200,
	CREATE_THANH_CONG = 201,
	CREATE_THANH_CONG_NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	SERVER = 500,
}

export enum SORT_LIST {
	PRICE = 1,
	SALE = 2,
}

export enum SORT_TYPE {
	ASC = 1,
	DESC = 2,
}
