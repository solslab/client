'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import {
	Pagination,
	PaginationItem,
	PaginationContent,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
	PaginationLink
} from '@/components/ui/pagination';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { getAllFeedbacks } from '@/app/lib/data-admin';
import { AllFeedbackPage } from '@/app/lib/definitions';

export default function FeedbackOverviewPage() {
	const [feedbacks, setFeedbacks] = useState<AllFeedbackPage['feedbacks']>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			const response = await getAllFeedbacks(currentPage, 10);
			if (response) {
				setFeedbacks(response.feedbacks);
				setTotalPages(response.total_pages);
				setTotalElements(response.total_elements);
			}
		};

		fetchFeedbacks();
	}, [currentPage]);


	return (
		<>
			<div className="container mx-auto">
				<div className="mb-4 flex h-10 items-center px-6">
					<span className="text-l font-medium" style={{ marginLeft: '7%' }}>
						피드백 목록 {feedbacks ? `(${totalElements})` : ''}
					</span>
				</div>

				<div className="flex w-full justify-center">
					<div className="flex w-10/12 flex-col gap-4">
						{feedbacks.map((feedback, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle>
										{feedback.feedback_content ? feedback.feedback_content : '-'}
									</CardTitle>
									<CardDescription>{feedback.created_date}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex items-center">
										{Array.from({ length: feedback.rating }, (_, i) => (
											<Star key={i} fill="yellow" color="#64748b" size={24} />
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

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
