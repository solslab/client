import { MetadataRoute } from 'next';
import { fetchAllCompanies, fetchCompanyDetail } from '@/app/lib/server/queries/company';

interface Ids {
	company_id: string;
}

interface Sitemap {
	url: string;
	lastModified: string;
	priority: number;
	changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const companies: Ids[] = await fetchAllCompanies();
	const newSiteMaps: Sitemap[] = [];

	for (const company of companies) {
		try {
			const companyData = await fetchCompanyDetail(company.company_id);
			if (companyData?.public) {
				// 회사 기본 페이지
				newSiteMaps.push({
					url: `https://sols.kr/company/${company.company_id}`,
					lastModified: new Date().toISOString(),
					priority: 1,
					changeFrequency: 'daily'
				});

				// 회사의 각 포지션 페이지
				const positions = companyData.positions;
				for (const position of positions) {
					newSiteMaps.push({
						url: `https://sols.kr/company/${company.company_id}/${position.position_id}`,
						lastModified: new Date().toISOString(),
						priority: 0.8,
						changeFrequency: 'daily'
					});
				}

				// datalab 페이지
				newSiteMaps.push({
					url: `https://sols.kr/company/${company.company_id}/datalab`,
					lastModified: new Date().toISOString(),
					priority: 0.9,
					changeFrequency: 'daily'
				});
			}
		} catch (error) {
			console.error(`Error fetching company ${company.company_id}:`, error);
			continue;
		}
	}

	return [
		{
			url: 'https://sols.kr/',
			lastModified: new Date().toISOString(),
			priority: 1,
			changeFrequency: 'daily'
		},
		{
			url: 'https://sols.kr/company',
			lastModified: new Date().toISOString(),
			priority: 1,
			changeFrequency: 'daily'
		},
		...newSiteMaps
	];
}
