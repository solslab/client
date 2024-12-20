'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchCompanyData } from '@/app/lib/data';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { CompanyPageResponse } from '@/app/lib/definitions';

export default function Layout({ children }: { children: React.ReactNode }) {
	const [companies, setCompanies] = useState<CompanyPageResponse | undefined>();
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchCompanyData(currentPage, 10);
			setCompanies(data);
		};

		fetchData();
	}, [currentPage]);

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="mx-auto w-full p-4">
				<SidebarTrigger />
				{children}
				<div className="flex flex-col">
					{companies?.companies.map((company) => (
						<Button
							variant="outline"
							className="mx-auto my-2 flex h-16 w-10/12 justify-start"
							key={company.company_id}
							onClick={() => router.push(`company/${company.company_id}`)}
						>
							<img
								src={company.company_logo || '/companyLogo/default_company_logo.png'}
								alt={`${company.company_name} Logo`}
								className="mr-2 w-12 rounded"
							/>
							<span>{company.company_name}</span>
						</Button>
					))}
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={() => setCurrentPage(currentPage - 1)}
									className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
								/>
							</PaginationItem>
							{Array.from({ length: companies?.total_pages || 0 }, (_, index) => (
								<PaginationItem key={index + 1}>
									<PaginationLink
										href="#"
										isActive={currentPage === index + 1}
										onClick={() => setCurrentPage(index + 1)}
									>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={() => setCurrentPage(currentPage + 1)}
									className={
										currentPage === (companies?.total_pages || 0)
											? 'pointer-events-none opacity-50'
											: ''
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</main>
		</SidebarProvider>
	);
}
