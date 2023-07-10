import {UserOctagon} from 'iconsax-react';

export const linksNavHeader: Array<{link: string; name: string; menu?: any[]}> =
	[
		{link: '/', name: 'Trang chủ'},
		{link: '/shop', name: 'Cửa hàng'},
	];

export const listMenuAvatar: Array<{icon: any; name: string; href: string}> = [
	{
		href: '/profile',
		icon: UserOctagon,
		name: 'Thông tin cá nhân',
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
	sale: number;
	price: number;
}

export const listCart: Array<TypeCart> = [
	{
		id: '111',
		image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
		name: 'Sản phẩm 1',
		price: 1250000,
		sale: 10,
		qlt: 1,
	},
	{
		id: '112',
		image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
		name: 'Sản phẩm 2',
		price: 1500000,
		sale: 15,
		qlt: 1,
	},
	{
		id: '113',
		image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',
		name: 'Sản phẩm 3',
		price: 1300000,
		sale: 5,
		qlt: 1,
	},
];
