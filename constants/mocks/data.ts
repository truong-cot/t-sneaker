import {ProfileCircle, ShieldSecurity, Location, ShoppingCart} from 'iconsax-react';

export const linksNavHeader: Array<{link: string; name: string; menu?: any[]}> = [
	{link: '/', name: 'Trang chủ'},
	{link: '/shop', name: 'Cửa hàng'},
];

export const listMenuProfile: Array<any> = [
	{
		title: 'Tài khoản của tôi',
		icon: ProfileCircle,
		href: '/profile',
	},
	{
		title: 'Đổi mật khẩu',
		icon: ShieldSecurity,
		href: '/profile/change-pass',
	},
	// {
	// 	title: 'Cài đặt',
	// 	icon: Setting3,
	// 	href: '/profile/setting-notify',
	// },
];

export const listMenuSidebarProfile: Array<{
	name: string;
	link: string;
	icon: any;
}> = [
	{
		icon: ProfileCircle,
		link: '/profile',
		name: 'Thông tin cá nhân',
	},
	{
		icon: Location,
		link: '/profile/list-address',
		name: 'Sổ địa chỉ',
	},
	{
		icon: ShoppingCart,
		link: '/profile/my-order',
		name: 'Quản lý đơn hàng',
	},
	{
		name: 'Đổi mật khẩu',
		icon: ShieldSecurity,
		link: '/profile/change-pass',
	},
];

export const listPolicy: Array<{name: string; link: string}> = [
	{
		name: 'Chính sách bảo mật của T - Sneaker',
		link: '/',
	},
	{
		name: 'Chính sách bảo hành của T - Sneaker',
		link: '/',
	},
	{
		name: 'Chính sách đổi trả hoàn tiền của T - Sneaker',
		link: '/',
	},
	{
		name: 'Chính sách vận chuyển của T - Sneaker',
		link: '/',
	},
];

export interface TypeCart {
	id: string;
	image: string;
	name: string;
	qlt: number;
	size: string;
	sale: number;
	unitPrice: number;
}

export const listCart: Array<TypeCart> = [
	{
		id: '111',
		image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
		name: 'Sản phẩm 1',
		unitPrice: 1250000,
		size: '38',
		sale: 10,
		qlt: 1,
	},
	{
		id: '112',
		image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
		name: 'Sản phẩm 2',
		unitPrice: 1500000,
		size: '40',
		sale: 15,
		qlt: 1,
	},
	{
		id: '113',
		image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
		name: 'Sản phẩm 3',
		unitPrice: 1300000,
		size: '39',
		sale: 5,
		qlt: 1,
	},
];
