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

import MemberDetailModal from '@/app/admin/components/member-detail';
import { AllMemberPage } from '@/app/lib/types/models';
import { getAllMembers } from '@/app/lib/server/queries/admin';

export default function MemberOverviewPage() {
	const [members, setMembers] = useState<AllMemberPage['members']>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [selectedMemberKey, setSelectedMemberKey] = useState<string | null>(null);

	useEffect(() => {
		const fetchMembers = async () => {
			const response = await getAllMembers(currentPage, 20);
			if (response) {
				setMembers(response.members);
				setTotalPages(response.total_pages);
				setTotalElements(response.total_elements);
			}
		};

		fetchMembers();
	}, [currentPage]);

	const handleRowClick = (memberKey: string) => {
		setSelectedMemberKey(memberKey);
	};

	const handleCloseModal = () => {
		setSelectedMemberKey(null);
	};

	return (
		<>
			{selectedMemberKey && (
				<MemberDetailModal memberKey={selectedMemberKey} onClose={handleCloseModal} />
			)}
			<div className="container mx-auto">
				<div className="mb-4 flex h-10 items-center px-6">
					<span className="text-l font-medium" style={{ marginLeft: '7%' }}>
						회원 목록 {members ? `(${totalElements})` : ''}
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
						{members ? (
							members.map((member) => (
								<TableRow
									key={member.member_key}
									onClick={() => handleRowClick(member.member_key)}
									className="cursor-pointer hover:bg-gray-100"
								>
									<TableCell className="font-medium">{member.name}</TableCell>
									<TableCell className="overflow-hidden text-ellipsis">{member.email}</TableCell>
									<TableCell>{member.social_type}</TableCell>
									<TableCell>{member.created_date}</TableCell>
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
