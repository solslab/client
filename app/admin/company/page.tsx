'use client';

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { fetchCompanyData, fetchFilteredCompanys } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import { CompanyPageResponse, CompanyQuery } from '@/app/lib/definitions';
import { CirclePlus } from 'lucide-react';
import CreateCompanyModal from '../components/create-company';


export default function Layout({ children }: { children: React.ReactNode }) {
	const [companies, setCompanies] = useState<CompanyPageResponse | undefined>();
	const [searchResults, setSearchResults] = useState<CompanyQuery[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchCompanyData(currentPage, 10);
			setCompanies(data);
		};

		fetchData();
	}, [currentPage]);

	useEffect(() => {
		const handler = setTimeout(async () => {
			if (searchQuery) {
				const filteredData = await fetchFilteredCompanys(searchQuery);
				setSearchResults(filteredData || []);
				setCurrentPage(1);
			} else {
				setSearchResults([]);
				setCurrentPage(1);
			}
		}, 200);

		return () => clearTimeout(handler);
	}, [searchQuery]);

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="mx-auto w-full">
				<SidebarTrigger />
				{children}
				<div className="flex flex-col">
					<div className="mb-4 mr-24 flex items-center justify-end">
						<Input
							type="text"
							placeholder="기업명으로 검색"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="ml-auto mr-2 w-72"
						/>
						{/* 기업 추가 버튼 */}
						<Button
							variant="ghost"
							onClick={() => setIsModalOpen(true)} // 모달 열기
							className="p-0"
							style={{ width: '40px', height: '40px' }}
						>
							<CirclePlus size={30} />
						</Button>
					</div>
					{searchResults.length > 0
						? searchResults.map((company) => (
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
							))
						: companies?.companies.map((company) => (
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
					{companies && searchResults.length === 0 && (
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
					)}
				</div>
				{/* 모달 컴포넌트 */}
				{isModalOpen && (
					<CreateCompanyModal
						onClose={() => setIsModalOpen(false)} // 모달 닫기
					/>
				)}
			</main>
		</SidebarProvider>
	);
}
