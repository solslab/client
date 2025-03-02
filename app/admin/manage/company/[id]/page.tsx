'use client';

import { FileEdit, LucideTrash } from 'lucide-react';
import { Button } from '@/app/ui/shadcn/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchCompanyDetail } from '@/app/lib/server/queries/company';
import { Company } from '@/app/lib/types/models/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/shadcn/components/ui/card';
import UpdateCompanyModal from '../../../components/update-company';
import TestInfoModal from '../../../components/test-info';
import CreatePositionModal from '@/app/admin/components/create-test-info';

import {
	deleteCompany,
	uploadCompanyLogo,
	deleteCompanyLogo,
	deleteTestInfo
} from '@/app/lib/server/mutations/company/index';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogAction
} from '@/app/ui/shadcn/components/ui/alert-dialog';
import { useIsAdminDomain } from '@/app/lib/hooks/useIsAdminDomain';

export default function CompanyDetailPage() {
	const [companyDetail, setCompanyDetail] = useState<Company | undefined>(undefined);
	const [isCompanyUpdateModalOpen, setIsCompanyUpdateModalOpen] = useState(false);
	const [isCreatePositionModalOpen, setIsCreatePositionModalOpen] = useState(false);

	// ====== 시험정보 수정 모달/상태 ======
	const [testInfoId, setTestInfoId] = useState('');

	// ====== 기업 삭제/알림 상태 ======
	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

	// ====== 시험정보 삭제/알림 상태 ======
	const [isDeleteTestConfirmOpen, setIsDeleteTestConfirmOpen] = useState(false);
	const [testInfoIdToDelete, setTestInfoIdToDelete] = useState('');

	// ====== 공통 AlertDialog 상태 ======
	const [alertMessage, setAlertMessage] = useState('');
	const [redirectLoginAfterClose, setRedirectLoginAfterClose] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const router = useRouter();
	const basePath = useIsAdminDomain() ? '' : '/admin';
	const { id } = useParams();
	const companyId = Array.isArray(id) ? id[0] : id;

	const fetchData = async () => {
		if (companyId) {
			const companyData = await fetchCompanyDetail(companyId);
			setCompanyDetail(companyData);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyId]);

	// 알림 창 닫힐 때 처리
	const handleAlertClose = () => {
		if (redirectLoginAfterClose) {
			router.push(`${basePath}/login`);
		} else if (isDeleted) {
			// 기업 삭제가 완료된 경우 목록으로 이동
			if (companyDetail?.public) {
				router.push(`${basePath}/manage/company`);
			} else if (!companyDetail?.public) {
				router.push(`${basePath}/manage/company/private`);
			}
		}
		setAlertMessage('');
	};

	// ====== 기업 삭제 함수 ======
	const handleDeleteCompany = async () => {
		setAlertMessage('');
		try {
			const response = await deleteCompany(companyId);
			if (response.status === 204) {
				setAlertMessage(response.message || '기업 삭제가 완료되었습니다.');
				setIsDeleted(true);
			} else {
				setAlertMessage(response.message || '기업 삭제 실패');
				if (response.status === 401) {
					setRedirectLoginAfterClose(true);
				}
			}
		} catch (error) {
			setAlertMessage('기업 삭제 실패. 다시 시도해주세요.');
		}
	};

	// ====== 시험정보 삭제 함수 ======
	const handleDeleteTestInfo = async () => {
		setAlertMessage('');
		try {
			const response = await deleteTestInfo(testInfoIdToDelete);
			if (response.status === 204) {
				// 삭제 성공
				setAlertMessage(response.message || '시험정보 삭제가 완료되었습니다.');
				// 목록 재조회
				fetchData();
			} else {
				// 오류
				setAlertMessage(response.message || '시험정보 삭제 실패');
				if (response.status === 401) {
					setRedirectLoginAfterClose(true);
				}
			}
		} catch (error) {
			setAlertMessage('시험정보 삭제 실패. 다시 시도해주세요.');
		}
	};

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

	const handleDeleteLogo = async () => {
		setAlertMessage('');
		try {
			const response = await deleteCompanyLogo(companyId);
			if (response.status === 204) {
				setAlertMessage('로고 삭제가 완료되었습니다.');
				fetchData();
			} else {
				setAlertMessage(response.message || '로고 삭제 실패');
				if (response.status === 401) {
					setRedirectLoginAfterClose(true);
				}
			}
		} catch (error) {
			setAlertMessage('로고 삭제 실패. 다시 시도해주세요.');
		}
	};

	return (
		<>
			{companyDetail && (
				<Card className="mx-auto mt-16 w-9/12 p-4">
					<CardHeader className="flex items-center">
						<div className="ml-auto flex gap-2">
							{/* 기업 수정 버튼 */}
							<Button variant="ghost" size="sm" onClick={() => setIsCompanyUpdateModalOpen(true)}>
								<FileEdit size={16} />
							</Button>

							{/* 기업 삭제 버튼 */}
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
									{companyDetail.search_terms.length === 1 && companyDetail.search_terms[0] === ''
										? '-'
										: companyDetail.search_terms.join(', ')}
								</div>
								<div>{companyDetail.public ? '공개' : '비공개'}</div>
							</div>
						</div>

						<div className="w-1/2">
							<Image
								src={companyDetail.company_logo || '/companyLogo/default_company_logo.png'}
								alt={`${companyDetail.company_name} 로고`}
								width={192}
								height={192}
								className="mx-auto mt-4 rounded-xl border-2 border-solid"
							/>
							<div className="mt-4 flex justify-center gap-4">
								{companyDetail.company_logo && (
									<Button
										variant="outline"
										onClick={() => {
											handleDeleteLogo();
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

					{/* 코딩테스트 정보 목록 */}
					<CardContent className="mt-16 flex w-full flex-col">
						<CardTitle className="p-4">
							코딩테스트 정보 목록 ({companyDetail.positions.length})
						</CardTitle>
						<div className="flex w-full flex-col gap-2 p-4">
							{/* 새로 추가하기 버튼 */}
							<Button
								className="mb-2 w-full p-5"
								variant="outline"
								onClick={() => setIsCreatePositionModalOpen(true)}
							>
								새로 추가하기
							</Button>

							{/* 각 시험정보(positions) 리스트 */}
							{companyDetail.positions.map((position, index) => (
								<div key={index} className="flex items-center gap-2">
									<Button
										className="w-full p-5 text-left"
										onClick={() => {
											setTestInfoId(position.position_id);
										}}
									>
										{position.position_name}
									</Button>

									<Button
										className="p-5 text-red-500"
										variant="outline"
										size="icon"
										onClick={() => {
											setTestInfoIdToDelete(position.position_id);
											setIsDeleteTestConfirmOpen(true);
										}}
									>
										<LucideTrash size={20} />
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* 시험정보 생성 모달 */}
			{isCreatePositionModalOpen && (
				<CreatePositionModal
					companyId={companyId}
					onClose={() => setIsCreatePositionModalOpen(false)}
					onSuccess={() => {
						fetchData();
						setIsCreatePositionModalOpen(false);
					}}
				/>
			)}

			{/* 기업 수정 모달 */}
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

			{/* 시험정보 상세/수정 모달 */}
			{testInfoId && (
				<TestInfoModal
					testInfoId={testInfoId}
					onClose={() => setTestInfoId('')}
					// onSuccess={() => {
					//   fetchData();
					//   setTestInfoId('');
					// }}
				/>
			)}

			{/* ===== 기업 삭제 확인 창 ===== */}
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
								className="bg-red-600"
							>
								삭제
							</AlertDialogAction>
							<AlertDialogCancel onClick={() => setIsDeleteConfirmOpen(false)}>
								취소
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}

			{/* ===== 시험정보 삭제 확인 창 ===== */}
			{isDeleteTestConfirmOpen && (
				<AlertDialog
					defaultOpen
					onOpenChange={(open) => {
						if (!open) {
							setIsDeleteTestConfirmOpen(false);
						}
					}}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>시험정보 삭제</AlertDialogTitle>
							<AlertDialogDescription>
								정말로 삭제하시겠습니까? 복구할 수 없습니다.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogAction
								onClick={() => {
									handleDeleteTestInfo();
									setIsDeleteTestConfirmOpen(false);
								}}
								className="bg-red-600"
							>
								삭제
							</AlertDialogAction>
							<AlertDialogCancel onClick={() => setIsDeleteTestConfirmOpen(false)}>
								취소
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}

			{/* ===== 공통 AlertDialog (성공/오류 메시지 표시) ===== */}
			{alertMessage && (
				<AlertDialog
					defaultOpen
					onOpenChange={(open) => {
						if (!open) {
							handleAlertClose();
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
									handleAlertClose();
								}}
							>
								확인
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</>
	);
}
