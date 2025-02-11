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

export default function SuggestionOverviewPage() {
	const [suggestions, setSuggestions] = useState<AllSuggestionPage['suggestions']>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [selectedsuggestionId, setSelectedsuggestionId] = useState<string | null>(null);

	useEffect(() => {
		const fetchSuggestions = async () => {
			const response = await getAllSuggestions(currentPage, 20);
			if (response) {
				setSuggestions(response.suggestions);
				setTotalPages(response.total_pages);
				setTotalElements(response.total_elements);
			}
		};

		fetchSuggestions();
	}, [currentPage]);

	const handleRowClick = (suggestionId: string) => {
		setSelectedsuggestionId(suggestionId);
	};

	const handleCloseModal = () => {
		setSelectedsuggestionId(null);
	};

	return (
		<>
			{selectedsuggestionId && (
				<SuggestionDetailModal suggestionId={selectedsuggestionId} onClose={handleCloseModal} />
			)}
			<div className="container mx-auto">
				<div className="mb-4 flex h-10 items-center px-6">
					<span className="text-l font-medium" style={{ marginLeft: '7%' }}>
						회원 목록 ({totalElements})
					</span>
				</div>
				<Table className="mx-auto w-10/12 border">
					<TableHeader>
						<TableRow>
							<TableHead>이름</TableHead>
							<TableHead>이메일</TableHead>
							<TableHead>가입 방식</TableHead>
							<TableHead>가입날짜</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{suggestions.map((suggestion) => (
							<TableRow
								key={suggestion.suggestionId}
								onClick={() => handleRowClick(Suggestion.Suggestion_key)}
								className="cursor-pointer hover:bg-gray-100"
							>
								<TableCell className="font-medium">{Suggestion.name}</TableCell>
								<TableCell className="overflow-hidden text-ellipsis">{Suggestion.email}</TableCell>
								<TableCell>{Suggestion.social_type}</TableCell>
								<TableCell>{Suggestion.created_date}</TableCell>
							</TableRow>
						))}
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
