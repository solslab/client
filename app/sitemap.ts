import { MetadataRoute } from 'next';
import { fetchAllCompanies } from '@/app/lib/data';

interface Ids {
  company_id: string;
}
interface Sitemap {
  url: string;
  lastModified: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}[]

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap>  {
  const companies: Ids[] = await fetchAllCompanies();
  const newSiteMaps:Sitemap[]= companies.flatMap(company => [
    {
      url: `/company/${company.company_id}`,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'daily'
    },
    {
      url: `/company/${company.company_id}/datalab`,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'daily'
    }
  ])

  return [
    {
      url: "https://sols.kr/",
      lastModified:new Date().toISOString(),
      priority: 1,
      changeFrequency: "daily"
    },
    {
      url: "https://sols.kr/company",
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: "daily"
    },
    ...newSiteMaps
    
  ]
}

