'use client';

import { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/app/ui/shadcn/components/ui/table';
import {
	Pagination,
	PaginationItem,
	PaginationContent,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
	PaginationLink
} from '@/app/ui/shadcn/components/ui/pagination';
import { getAllReviews } from '@/app/lib/server/queries/admin';
import { AllReviewPage } from '@/app/lib/types/models';
import ReviewDetailModal from '../../components/review-detail';

export default function ReviewOverviewPage() {
	const [reviews, setReviews] = useState<AllReviewPage['test_reviews']>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [selectedTrId, setSelectedTrId] = useState<string | null>(null);

	useEffect(() => {
		const fetchReviews = async () => {
			const response = await getAllReviews(currentPage, 15);
			if (response) {
				setReviews(response.test_reviews);
				setTotalPages(response.total_pages);
				setTotalElements(response.total_elements);
			}
		};

		fetchReviews();
	}, [currentPage]);

	const handleRowClick = (trId: string) => {
		setSelectedTrId(trId);
	};

	const handleCloseModal = () => {
		setSelectedTrId(null);
	};

	return (
		<>
			{selectedTrId && <ReviewDetailModal trId={selectedTrId} onClose={handleCloseModal} />}
			<div className="container mx-auto">
				<div className="mb-4 flex h-10 items-center px-6">
					<span className="text-l font-medium" style={{ marginLeft: '7%' }}>
						리뷰 목록 ({totalElements})
					</span>
				</div>
				<Table className="mx-auto w-10/12 border">
					<TableHeader>
						<TableRow>
							<TableHead>작성자</TableHead>
							<TableHead>회사명</TableHead>
							<TableHead>작성 날짜</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{reviews.map((review) => (
							<TableRow
								key={review.tr_id}
								onClick={() => handleRowClick(review.tr_id)}
								className="cursor-pointer hover:bg-gray-100"
							>
								<TableCell className="font-medium">{review.member_name}</TableCell>
								<TableCell className="overflow-hidden text-ellipsis">
									{review.company_name}
								</TableCell>
								<TableCell>{review.created_date}</TableCell>
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
