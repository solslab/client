/* eslint-disable @next/next/no-img-element */
'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FileEdit, LucideTrash } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchCompanyDetail } from '@/app/lib/data';
import { Company } from '@/app/lib/definitions';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

export default function CompanyDetailPage({
	children,
	params
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const [companyDetail, setCompanyDetail] = useState<Company | undefined>(undefined);

	const companyId = params.id;

	useEffect(() => {
		const fetchData = async () => {
			if (companyId) {
				const companyData = await fetchCompanyDetail(companyId);
				setCompanyDetail(companyData);
			}
		};

		fetchData();
	}, [companyId]);

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="mx-auto w-full p-4">
				<SidebarTrigger />
				{children}
				{companyDetail && (
					<Card className="mx-auto w-9/12 p-4">
						<CardHeader className="flex items-center">
							<div className="ml-auto flex gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										alert('수정 버튼 클릭');
									}}
								>
									<FileEdit size={16} />
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										alert('삭제 버튼 클릭');
									}}
								>
									<LucideTrash size={16} />
								</Button>
							</div>
						</CardHeader>
						<CardTitle className="pl-12 mb-4">기업 상세정보</CardTitle>
						<CardContent className="flex w-full">
							<div className="jusitfy-center flex w-1/2 pt-8">
								<div className="mx-auto flex flex-col gap-4">
									<p>기업 이름</p>
									<p>업종</p>
									<p>검색어</p>
								</div>
								<div className="mx-auto flex flex-col gap-4">
									<div>{companyDetail.company_name}</div>
									<div>{companyDetail.industry_type.join(', ')}</div>
									<div>{companyDetail.search_terms.join(', ')}</div>
								</div>
							</div>
							<div className="w-1/2">
								<img
									src={companyDetail.company_logo}
									alt="Company Logo"
									className="mx-auto mt-4 w-48 rounded-xl border-2 border-solid"
								/>
								<div className="mt-4 flex justify-center gap-4">
									<Button
										variant="outline"
										onClick={() => {
											// 삭제 버튼 로직
											alert('삭제 버튼이 클릭되었습니다.');
										}}
									>
										삭제
									</Button>
									<Button
										variant="secondary"
										onClick={() => {
											// 수정 버튼 로직
											alert('수정 버튼이 클릭되었습니다.');
										}}
									>
										수정
									</Button>
								</div>
							</div>
						</CardContent>
						<CardContent className="mt-16 flex w-full flex-col">
							<CardTitle className="p-4">코딩테스트 정보 목록</CardTitle>
							<div className="w-full p-4 flex flex-col gap-2">
								{companyDetail.positions.map((position, index) => (
									<Button
										key={index}
										className="w-full mb-2"
										onClick={() => {
											alert(`Position clicked: ${position.position_name}`);
										}}
									>
								{position.position_name}
								</Button>
							))}
						</div>
						</CardContent>
					</Card>
				)}
			</main>
		</SidebarProvider>
	);
}
