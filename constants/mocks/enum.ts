export enum MONEY_CART {
	MONEY_50 = 500000,
	MONEY_150 = 1500000,
	MONEY_300 = 3000000,
}

export enum DISCOUNT_MONEY {
	DISCOUNT_01 = 15000,
	DISCOUNT_02 = 30000,
	DISCOUNT_03 = 50000,
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

// Trạng thái đơn hàng: 1: Chờ xác nhận, 2: Đã xác nhận và đang giao, 3: Giao thành công, 4: Đã hủy
export enum STATUS_ORDER {
	CHO_XAC_NHAN = 1,
	DA_XAC_NHAN,
	DA_GIAO,
	DA_HUY,
}
