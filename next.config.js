/** @type {import('next').NextConfig} */

const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	swcMinify: true,
	devIndicators: {
		buildActivity: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
		domains: ['res.cloudinary.com', 'images.pexels.com'],
	},
};

module.exports = nextConfig;
