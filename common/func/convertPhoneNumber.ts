export const formatPhoneNumber = (phoneNumber: string) => {
	// Xóa các ký tự không phải số
	var cleaned = phoneNumber.replace(/\D/g, '');

	// Kiểm tra độ dài của số điện thoại
	var length = cleaned.length;
	if (length !== 10) {
		return phoneNumber; // Trả về số điện thoại gốc nếu không hợp lệ
	}

	// Chia thành các phần: 0339 -> 940 -> 200
	var areaCode = cleaned.slice(0, 4);
	var firstPart = cleaned.slice(4, 7);
	var secondPart = cleaned.slice(7);

	// Ghép các phần lại với dấu chấm "."
	var formatted = areaCode + '.' + firstPart + '.' + secondPart;

	return formatted;
};
