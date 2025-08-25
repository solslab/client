/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's3.ap-northeast-2.amazonaws.com',
				pathname: '/solslab/**'
			}
		]
	},
	logging: {
		fetches: {
			fullUrl: true
		}
	}
};

export default nextConfig;
