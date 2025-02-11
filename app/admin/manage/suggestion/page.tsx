'use client'

import { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import {
	Pagination,
	PaginationItem,
	PaginationContent,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
	PaginationLink
} from '@/components/ui/pagination';
import { getAllSuggestions } from '@/app/lib/data-admin';
import { AllSuggestionPage } from '@/app/lib/definitions';
import SuggestionDetailModal from '@/app/admin/components/suggestion-detail';
import { STATUS_OPTIONS } from '@/app/lib/constants';


export default function SuggestionOverviewPage() {
	const [suggestions, setSuggestions] = useState<AllSuggestionPage['suggestions']>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [selectedSuggestionId, setSelectedSuggestionId] = useState<string | null>(null);

	const fetchSuggestions = async () => {
		const response = await getAllSuggestions(currentPage, 15);
		if (response) {
			setSuggestions(response.suggestions);
			setTotalPages(response.total_pages);
			setTotalElements(response.total_elements);
		}
	};

	useEffect(() => {
		fetchSuggestions();
	}, [currentPage]);

	const handleRowClick = (suggestionId: string) => {
		setSelectedSuggestionId(suggestionId);
	};

	const handleCloseModal = () => {
		setSelectedSuggestionId(null);
	};

	return (
		<>
			{selectedSuggestionId && (
				<SuggestionDetailModal suggestionId={selectedSuggestionId} onClose={handleCloseModal} onRefresh={fetchSuggestions} />
			)}
			<div className="container mx-auto">
				<div className="mb-4 flex h-10 items-center px-6">
					<span className="text-l font-medium" style={{ marginLeft: '7%' }}>
						정보수정요청 목록 {suggestions ? `(${totalElements})` : ''}
					</span>
				</div>
				<Table className="mx-auto w-10/12 border">
					<TableHeader>
						<TableRow>
							<TableHead>회사명</TableHead>
							<TableHead>작성자명</TableHead>
							<TableHead>작성날짜</TableHead>
							<TableHead>처리상태</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{suggestions ? (
							suggestions.map((suggestion) => (
								<TableRow
									key={suggestion.suggestion_id}
									onClick={() => handleRowClick(suggestion.suggestion_id)}
									className="cursor-pointer hover:bg-gray-100"
								>
									<TableCell className="font-medium">{suggestion.company_name}</TableCell>
									<TableCell>{suggestion.member_name}</TableCell>
									<TableCell>{suggestion.created_date}</TableCell>
									<TableCell>
										{STATUS_OPTIONS.find((option) => option.value === suggestion.status)?.label ||
											'-'}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className="py-4 text-center text-gray-500">
									정보가 없습니다.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<Pagination className="mt-4">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={() => setCurrentPage(currentPage - 1)}
								className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
							/>
						</PaginationItem>
						{(() => {
							const range = 2;
							const pages = [];

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
								className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</>
	);
}
