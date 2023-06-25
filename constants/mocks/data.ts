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
