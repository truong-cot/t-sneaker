import jwt from 'jwt-simple';

export const signJWT = (payload: any) => {
	return jwt.encode(payload, `${process.env.NEXT_PUBLIC_JWT_SECRET}`);
};

export const verifyJWT = async (data: string, router: any) => {
	try {
		return jwt.decode(data, `${process.env.NEXT_PUBLIC_JWT_SECRET}`);
	} catch (error) {
		router.push('/404');
		return 1;
	}
};
