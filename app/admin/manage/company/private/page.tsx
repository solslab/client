'use client';
import clsx from 'clsx';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis
} from '@/components/ui/pagination';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { getAllPrivateCompanyData, searchPrivateCompanies } from '@/app/lib/data-admin';
import { useRouter } from 'next/navigation';
import { CompanyPageResponse, CompanyQuery } from '@/app/lib/definitions';
import { CirclePlus } from 'lucide-react';
import CreateCompanyModal from '../../../components/create-company';

export default function PrivateCompanyOverviewPage() {
	const [companies, setCompanies] = useState<CompanyPageResponse | undefined>();
	const [searchResults, setSearchResults] = useState<CompanyQuery[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllPrivateCompanyData(currentPage, 10);
			setCompanies(data);
		};

		fetchData();
	}, [currentPage]);

	useEffect(() => {
		const handler = setTimeout(async () => {
			if (searchQuery) {
				const filteredData = await searchPrivateCompanies(searchQuery);
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
		<>
			<div className="flex flex-col">
				<div className={clsx('mb-4 flex items-center justify-between', 'px-[8.5%]')}>
					<span className={clsx('text-l hidden font-medium sm:block')}>
						비공개 기업 목록 ({companies?.total_elements || 0})
					</span>
					<div className={clsx('flex w-full items-center sm:w-auto')}>
						<Input
							type="text"
							placeholder="기업명으로 검색"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="mr-2 w-full sm:w-56"
						/>
						<Button
							variant="ghost"
							onClick={() => setIsModalOpen(true)} // 모달 열기
							className="p-0"
							style={{ width: '40px', height: '40px' }}
						>
							<CirclePlus size={30} />
						</Button>
					</div>
				</div>

				{searchResults.length > 0
					? searchResults.map((company) => (
							<Button
								variant="outline"
								className="mx-auto my-2 flex h-16 w-10/12 justify-start"
								key={company.company_id}
								onClick={() => router.push(`${company.company_id}`)}
							>
								<Image
									src={company.company_logo || '/companyLogo/default_company_logo.png'}
									alt={`${company.company_name} 로고`}
									width={48}
									height={48}
									className="mr-2 rounded"
								/>
								<span>{company.company_name}</span>
							</Button>
						))
					: companies?.companies.map((company) => (
							<Button
								variant="outline"
								className="mx-auto my-2 flex h-16 w-10/12 justify-start"
								key={company.company_id}
								onClick={() => router.push(`${company.company_id}`)}
							>
								<Image
									src={company.company_logo || '/companyLogo/default_company_logo.png'}
									alt={`${company.company_name} 로고`}
									width={48}
									height={48}
									className="mr-2 rounded"
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
							{(() => {
								const totalPages = companies?.total_pages || 0;
								const range = 2; // 현재 페이지를 기준으로 양쪽에 표시할 페이지 수
								const pages = [];

								// 첫 번째 페이지 항상 표시
								if (1 < currentPage - range) {
									pages.push(
										<PaginationItem key={1}>
											<PaginationLink
												href="#"
												isActive={currentPage === 1}
												onClick={() => setCurrentPage(1)}
											>
												1
											</PaginationLink>
										</PaginationItem>
									);
									pages.push(
										<PaginationItem key="ellipsis-start">
											<PaginationEllipsis />
										</PaginationItem>
									);
								}

								// 현재 페이지를 기준으로 표시할 페이지들
								for (
									let page = Math.max(1, currentPage - range);
									page <= Math.min(totalPages, currentPage + range);
									page++
								) {
									pages.push(
										<PaginationItem key={page}>
											<PaginationLink
												href="#"
												isActive={currentPage === page}
												onClick={() => setCurrentPage(page)}
											>
												{page}
											</PaginationLink>
										</PaginationItem>
									);
								}

								// 마지막 페이지 항상 표시
								if (totalPages > currentPage + range) {
									pages.push(
										<PaginationItem key="ellipsis-end">
											<PaginationEllipsis />
										</PaginationItem>
									);
									pages.push(
										<PaginationItem key={totalPages}>
											<PaginationLink
												href="#"
												isActive={currentPage === totalPages}
												onClick={() => setCurrentPage(totalPages)}
											>
												{totalPages}
											</PaginationLink>
										</PaginationItem>
									);
								}

								return pages;
							})()}
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
		</>
	);
}
