/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.sols.kr',
				pathname: '/images/**'
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
