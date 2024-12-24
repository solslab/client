/* eslint-disable @next/next/no-img-element */
'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FileEdit, LucideTrash } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchCompanyDetail } from '@/app/lib/data';
import { Company } from '@/app/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UpdateCompanyModal from '../../components/update-company';
import { deleteCompany, uploadCompanyLogo } from '@/app/lib/data-admin';
import { useRouter } from 'next/navigation';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogAction
} from '@/components/ui/alert-dialog';


export default function CompanyDetailPage({
	children,
	params
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const [companyDetail, setCompanyDetail] = useState<Company | undefined>(undefined);
	const [isCompanyUpdateModalOpen, setIsCompanyUpdateModalOpen] = useState(false);
	const [redirectLoginAfterClose, setRedirectLoginAfterClose] = useState(false);
	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [isDeleted, setIsDeleted] = useState(false);
	const [newLogoFile, setNewLogoFile] = useState<File | null>(null);

	const companyId = params.id;
	const router = useRouter();

	const fetchData = async () => {
		if (companyId) {
			const companyData = await fetchCompanyDetail(companyId);
			setCompanyDetail(companyData);
		}
	};
	useEffect(() => {
		fetchData();
	}, [companyId]);

	const handleClose = () => {
		if (redirectLoginAfterClose) {
			router.push('/admin/login');
		} else if (isDeleted) {
			router.push('/admin/company');
		}
		setAlertMessage('');
	};

	const handleDeleteCompany = async () => {
		setAlertMessage('');
		try {
			const response = await deleteCompany(companyId);
			if (response.status == 204) {
				setAlertMessage(response.message);
				setIsDeleted(true);
			} else {
				setAlertMessage(response.message);
				if (response.status === 401) {
					setRedirectLoginAfterClose(true);
				}
			}
		} catch (error) {
			setAlertMessage('기업 삭제 실패. 다시 시도해주세요.');
		}
	};

	// 파일 선택 핸들러
	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			try {
				const response = await uploadCompanyLogo(companyId, event.target.files[0]);
				if (response.status === 200) {
					setAlertMessage('로고가 성공적으로 업데이트되었습니다.');
					fetchData();
				} else {
					setAlertMessage(response.message || '로고 업로드 실패');
				}
			} catch (error) {
				setAlertMessage('로고 업로드 중 오류가 발생했습니다.');
			}
		}
	};

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full">
				<SidebarTrigger />
				{children}
				{companyDetail && (
					<Card className="mx-auto mt-16 w-9/12 p-4">
						<CardHeader className="flex items-center">
							<div className="ml-auto flex gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setIsCompanyUpdateModalOpen(true)} // 모달 열기
								>
									<FileEdit size={16} />
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setIsDeleteConfirmOpen(true);
									}}
								>
									<LucideTrash size={16} />
								</Button>
							</div>
						</CardHeader>
						<CardTitle className="mb-4 pl-12">기업 상세정보</CardTitle>
						<CardContent className="flex w-full">
							<div className="jusitfy-center flex w-1/2 pt-8">
								<div className="mx-auto flex min-w-16 flex-col gap-4">
									<p>기업 이름</p>
									<p>업종</p>
									<p>검색어</p>
									<p>공개 여부</p>
								</div>
								<div className="mx-auto flex max-w-72 flex-col gap-4">
									<div>{companyDetail.company_name}</div>
									<div>
										{companyDetail.industry_type.length > 0
											? companyDetail.industry_type.join(', ')
											: '-'}
									</div>
									<div>
										{companyDetail.search_terms.length == 1 && companyDetail.search_terms[0] === ''
											? '-'
											: companyDetail.search_terms.join(', ')}
									</div>
									<div>{companyDetail.public ? '공개' : '비공개'}</div>
								</div>
							</div>
							<div className="w-1/2">
								<img
									src={companyDetail.company_logo || '/companyLogo/default_company_logo.png'}
									alt="Company Logo"
									className="mx-auto mt-4 w-48 rounded-xl border-2 border-solid"
								/>
								<div className="mt-4 flex justify-center gap-4">
									{companyDetail.company_logo && (
										<Button
											variant="outline"
											onClick={() => {
												alert('삭제 버튼이 클릭되었습니다.');
											}}
										>
											삭제
										</Button>
									)}

									<Button
										variant="secondary"
										onClick={() => {
											document.getElementById('logo-upload')?.click();
										}}
									>
										{companyDetail.company_logo ? '수정' : '사진 등록'}
									</Button>

									{/* 파일 input 숨기기 */}
									<input
										id="logo-upload"
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleFileChange}
									/>
								</div>
							</div>
						</CardContent>
						<CardContent className="mt-16 flex w-full flex-col">
							<CardTitle className="p-4">코딩테스트 정보 목록</CardTitle>
							<div className="flex w-full flex-col gap-2 p-4">
								<Button className="mb-2 w-full" variant="outline">
									새로 추가하기
								</Button>
								{companyDetail.positions.map((position, index) => (
									<Button
										key={index}
										className="mb-2 w-full"
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
				{isCompanyUpdateModalOpen && companyDetail && (
					<UpdateCompanyModal
						companyId={companyId}
						companyDetail={companyDetail}
						onClose={() => setIsCompanyUpdateModalOpen(false)}
						onSuccess={() => {
							fetchData();
							setIsCompanyUpdateModalOpen(false);
						}}
					/>
				)}
				{isDeleteConfirmOpen && (
					<AlertDialog
						defaultOpen
						onOpenChange={(open) => {
							if (!open) {
								setIsDeleteConfirmOpen(false);
							}
						}}
					>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>기업 삭제</AlertDialogTitle>
								<AlertDialogDescription>
									정말로 삭제하시겠습니까? 복구할 수 없습니다.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogAction
									onClick={() => {
										handleDeleteCompany();
										setIsDeleteConfirmOpen(false);
									}}
								>
									Delete
								</AlertDialogAction>
								<AlertDialogCancel onClick={() => setIsDeleteConfirmOpen(false)}>
									Close
								</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
				{alertMessage && (
					<AlertDialog
						defaultOpen
						onOpenChange={(open) => {
							if (!open) {
								handleClose();
							}
						}}
					>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle></AlertDialogTitle>
								<AlertDialogDescription>{alertMessage}</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel
									onClick={() => {
										handleClose();
									}}
								>
									Close
								</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</main>
		</SidebarProvider>
	);
}
