/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	images: {
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
