import { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { getTestInfo, updateTestInfo } from '@/app/lib/data-admin';
import { TestData } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';

type TestInfoModalProps = {
	testInfoId: string;
	onClose: () => void;
	onSuccess?: () => void;
};

export default function TestInfoModal({ testInfoId, onClose, onSuccess }: TestInfoModalProps) {
	const [testInfo, setTestInfo] = useState<TestData | undefined>(undefined);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<TestData | undefined>(undefined);

	// AlertDialog 관련 상태
	const [alertMessage, setAlertMessage] = useState('');
	const [redirectLoginAfterClose, setRedirectLoginAfterClose] = useState(false);
	const isSmallScreen = useIsSmallScreen();
	const router = useRouter();
	// 필요 시, Admin 도메인이라면 basePath = '', 아니면 '/admin' 등을 설정
	const basePath = useIsAdminDomain() ? '' : '/admin';

	useEffect(() => {
		const fetchTestInfo = async () => {
			const data = await getTestInfo(testInfoId);
			setTestInfo(data);
			setEditData(data);
		};

		if (testInfoId) {
			fetchTestInfo();
		}
	}, [testInfoId]);

	const handleChange = (field: keyof TestData, value: any) => {
		setEditData((prev) => (prev ? { ...prev, [field]: value } : undefined));
	};

	const handleSubmit = async () => {
		if (!editData) return;
		setAlertMessage('');

		try {
			const response = await updateTestInfo(testInfoId, editData);
			if (response.status === 200) {
				setTestInfo(response.data);
				setIsEditing(false);
				setAlertMessage('코딩테스트 정보 수정이 완료되었습니다.');
			} else {
				setAlertMessage(response.message);
				if (response.status === 401) {
					setRedirectLoginAfterClose(true);
				}
			}
		} catch (error) {
			setAlertMessage('코딩테스트 정보 수정 실패. 다시 시도해주세요.');
		}
	};

	const handleAlertClose = () => {
		if (redirectLoginAfterClose) {
			router.push(`${basePath}/login`);
		} else if (alertMessage === '코딩테스트 정보 수정이 완료되었습니다.') {
			onSuccess?.();
		}
	};

	const renderFormFields = () => (
		<div className="grid gap-4 p-4">
			{/* 이름 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">이름</Label>
				{isEditing ? (
					<Input
						value={editData?.position_name || ''}
						onChange={(e) => handleChange('position_name', e.target.value)}
					/>
				) : (
					<p className="truncate">{testInfo?.position_name}</p>
				)}
			</div>

			{/* 공식 여부 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">공식 여부</Label>
				{isEditing ? (
					<Select
						// 공식 여부는 true/false 그대로
						value={editData?.is_official ? 'true' : 'false'}
						onValueChange={(value: string) => handleChange('is_official', value === 'true')}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="true">공식</SelectItem>
							<SelectItem value="false">비공식</SelectItem>
						</SelectContent>
					</Select>
				) : (
					<p className="truncate">{testInfo?.is_official ? '공식' : '비공식'}</p>
				)}
			</div>

			{/* 지원 언어 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">지원 언어</Label>
				{isEditing ? (
					<Input
						value={editData?.support_languages.join(', ') || ''}
						onChange={(e) => handleChange('support_languages', e.target.value.split(', '))}
						placeholder="Python, Java"
					/>
				) : (
					<p className="truncate">{testInfo?.support_languages.join(', ') || '-'}</p>
				)}
			</div>

			{/* 시험 시간 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">시험 시간</Label>
				{isEditing ? (
					<Input
						value={editData?.test_time || ''}
						onChange={(e) => handleChange('test_time', e.target.value)}
					/>
				) : (
					<p className="truncate">{testInfo?.test_time || '-'}</p>
				)}
			</div>

			{/* 문제 정보 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">문제 정보</Label>
				{isEditing ? (
					<Input
						value={editData?.problem_info || ''}
						onChange={(e) => handleChange('problem_info', e.target.value)}
					/>
				) : (
					<p className="truncate">{testInfo?.problem_info || '-'}</p>
				)}
			</div>

			{/* IDE 사용 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">IDE 사용</Label>
				{isEditing ? (
					<Select
						// 내부적으로 "none"을 써서 "선택안함" 구현
						value={editData?.permit_ide ? editData.permit_ide : 'none'}
						onValueChange={(value: string) =>
							handleChange('permit_ide', value === 'none' ? '' : value)
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="IDE 사용 여부 선택" />
						</SelectTrigger>
						<SelectContent>
							{/* value="" 대신 value="none" */}
							<SelectItem value="none">선택안함</SelectItem>
							<SelectItem value="가능">가능</SelectItem>
							<SelectItem value="불가능">불가능</SelectItem>
						</SelectContent>
					</Select>
				) : (
					<p className="truncate">{testInfo?.permit_ide || '선택안함'}</p>
				)}
			</div>

			{/* 구글링 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">구글링</Label>
				{isEditing ? (
					<Select
						value={editData?.permit_search ? editData.permit_search : 'none'}
						onValueChange={(value: string) =>
							handleChange('permit_search', value === 'none' ? '' : value)
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="구글링 허용 여부 선택" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="none">선택안함</SelectItem>
							<SelectItem value="가능">가능</SelectItem>
							<SelectItem value="불가능">불가능</SelectItem>
						</SelectContent>
					</Select>
				) : (
					<p className="truncate">{testInfo?.permit_search || '선택안함'}</p>
				)}
			</div>

			{/* 히든 테스트케이스 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">히든 테스트케이스</Label>
				{isEditing ? (
					<Select
						value={editData?.hidden_case ? editData.hidden_case : 'none'}
						onValueChange={(value: string) =>
							handleChange('hidden_case', value === 'none' ? '' : value)
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="히든 테스트케이스 여부 선택" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="none">선택안함</SelectItem>
							<SelectItem value="있음">있음</SelectItem>
							<SelectItem value="없음">없음</SelectItem>
						</SelectContent>
					</Select>
				) : (
					<p className="truncate">{testInfo?.hidden_case || '선택안함'}</p>
				)}
			</div>

			{/* 시험 방식 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">시험 방식</Label>
				{isEditing ? (
					<Select
						value={editData?.exam_mode ? editData.exam_mode : 'none'}
						onValueChange={(value: string) =>
							handleChange('exam_mode', value === 'none' ? '' : value)
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="시험 방식 선택" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="none">선택안함</SelectItem>
							<SelectItem value="대면">대면</SelectItem>
							<SelectItem value="비대면">비대면</SelectItem>
						</SelectContent>
					</Select>
				) : (
					<p className="truncate">{testInfo?.exam_mode || '선택안함'}</p>
				)}
			</div>

			{/* 시험 장소 / 플랫폼 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">시험 장소 / 플랫폼</Label>
				{isEditing ? (
					<Input
						value={editData?.test_place || ''}
						onChange={(e) => handleChange('test_place', e.target.value)}
					/>
				) : (
					<p className="truncate">{testInfo?.test_place || '-'}</p>
				)}
			</div>

			{/* 비고 */}
			<div className="grid grid-cols-[1fr,3fr] items-center gap-8">
				<Label className="text-right">비고</Label>
				{isEditing ? (
					<Textarea
						value={editData?.note || ''}
						onChange={(e) => handleChange('note', e.target.value)}
					/>
				) : (
					<p className="truncate">{testInfo?.note || '-'}</p>
				)}
			</div>
		</div>
	);

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>코딩테스트 상세정보</DialogTitle>
				</DialogHeader>

				{/* 640px 이하라면 ScrollArea로, 그렇지 않으면 일반 div */}
				{isSmallScreen ? (
					<ScrollArea className="h-[400px] sm:h-full">{renderFormFields()}</ScrollArea>
				) : (
					<div>{renderFormFields()}</div>
				)}

				<DialogFooter>
					{isEditing ? (
						<>
							<Button onClick={handleSubmit}>저장</Button>
							<Button
								variant="outline"
								onClick={() => {
									setIsEditing(false);
									setEditData(testInfo);
								}}
							>
								취소
							</Button>
						</>
					) : (
						<>
							<Button variant="outline" onClick={() => setIsEditing(true)}>
								수정
							</Button>
							<Button onClick={onClose}>닫기</Button>
						</>
					)}
				</DialogFooter>
			</DialogContent>

			{/* AlertDialog 영역 */}
			{alertMessage && (
				<AlertDialog
					defaultOpen
					onOpenChange={(open) => {
						// AlertDialog가 닫힐 때
						if (!open) {
							setAlertMessage('');
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
									setAlertMessage('');
									handleAlertClose();
								}}
							>
								확인
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</Dialog>
	);
}
