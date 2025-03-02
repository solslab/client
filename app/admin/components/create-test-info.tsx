'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useIsSmallScreen } from '@/app/lib/hooks/useIsSmallScreen'; // <- 방금 만든 Hook
import { useIsAdminDomain } from '@/app/lib/hooks/useIsAdminDomain';

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/app/ui/shadcn/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/app/ui/shadcn/components/ui/alert-dialog';
import { ScrollArea } from '@/app/ui/shadcn/components/ui/scroll-area';
import { Input } from '@/app/ui/shadcn/components/ui/input';
import { Button } from '@/app/ui/shadcn/components/ui/button';
import { Label } from '@/app/ui/shadcn/components/ui/label';
import { Textarea } from '@/app/ui/shadcn/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/app/ui/shadcn/components/ui/select';

import { createTestInfo } from '@/app/lib/server/mutations/company/index';

type CreatePositionModalProps = {
	companyId: string;
	onClose: () => void;
	onSuccess?: () => void;
};

export default function CreatePositionModal({
	companyId,
	onClose,
	onSuccess
}: CreatePositionModalProps) {
	// 필드 상태들
	const [positionName, setPositionName] = useState('');
	const [isOfficial, setIsOfficial] = useState<boolean>(false);
	const [supportLanguages, setSupportLanguages] = useState('');
	const [testTime, setTestTime] = useState('');
	const [problemInfo, setProblemInfo] = useState('');
	const [permitIde, setPermitIde] = useState<'가능' | '불가능' | ''>('');
	const [permitSearch, setPermitSearch] = useState<'가능' | '불가능' | ''>('');
	const [hiddenCase, setHiddenCase] = useState<'있음' | '없음' | ''>('');
	const [examMode, setExamMode] = useState<'대면' | '비대면' | ''>('');
	const [testPlace, setTestPlace] = useState('');
	const [note, setNote] = useState('');

	// AlertDialog 관련 상태
	const [alertMessage, setAlertMessage] = useState('');
	const [redirectLoginAfterClose, setRedirectLoginAfterClose] = useState(false);

	const router = useRouter();
	const basePath = useIsAdminDomain() ? '' : '/admin';

	// 반응형 체크
	const isSmallScreen = useIsSmallScreen();

	// AlertDialog 닫힐 때 처리
	const handleAlertClose = () => {
		if (redirectLoginAfterClose) {
			router.push(`${basePath}/login`);
		} else if (alertMessage === '시험정보 생성이 완료되었습니다.') {
			onSuccess?.();
		}
	};

	// 시험정보 생성
	const handleSave = async () => {
		setAlertMessage('');

		try {
			// body 구성 (빈 문자열 제거)
			const requestBody: Record<string, any> = {
				position_name: positionName,
				is_official: isOfficial,
				support_languages: supportLanguages
					.split(',')
					.map((lang) => lang.trim())
					.filter((lang) => lang !== ''),
				test_time: testTime,
				problem_info: problemInfo,
				permit_ide: permitIde,
				permit_search: permitSearch,
				hidden_case: hiddenCase,
				exam_mode: examMode,
				test_place: testPlace,
				note: note
			};

			Object.keys(requestBody).forEach((key) => {
				if (requestBody[key] === '') {
					delete requestBody[key];
				}
			});

			const response = await createTestInfo(companyId, requestBody);

			if (response.status === 200) {
				setAlertMessage('시험정보 생성이 완료되었습니다.');
			} else {
				setAlertMessage(response.message || '시험정보 생성 실패');
				if (response.status === 401) {
					setRedirectLoginAfterClose(true);
				}
			}
		} catch (error) {
			console.error(error);
			setAlertMessage('시험정보 생성 중 오류가 발생했습니다.');
		}
	};

	// 가독성을 위해 form 내용만 별도 함수로 추출
	const renderFormFields = () => (
		<div className="grid gap-4 p-4">
			{/* 직무명 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="positionName" className="text-right">
					직무명
				</Label>
				<Input
					id="positionName"
					value={positionName}
					placeholder="예) 백엔드"
					onChange={(e) => setPositionName(e.target.value)}
					className="col-span-3"
				/>
			</div>

			{/* 공식 여부 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label className="text-right">공식 여부</Label>
				<div className="col-span-3 flex gap-2">
					<Button
						variant={isOfficial === true ? 'default' : 'outline'}
						onClick={() => setIsOfficial(true)}
					>
						공식
					</Button>
					<Button
						variant={isOfficial === false ? 'default' : 'outline'}
						onClick={() => setIsOfficial(false)}
					>
						비공식
					</Button>
				</div>
			</div>

			{/* 지원 언어 (CSV) */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="supportLanguages" className="text-right">
					지원 언어
				</Label>
				<Input
					id="supportLanguages"
					value={supportLanguages}
					placeholder="예) Python, Java"
					onChange={(e) => setSupportLanguages(e.target.value)}
					className="col-span-3"
				/>
			</div>

			{/* 시험 시간 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="testTime" className="text-right">
					시험 시간
				</Label>
				<Input
					id="testTime"
					value={testTime}
					placeholder="예) 60분"
					onChange={(e) => setTestTime(e.target.value)}
					className="col-span-3"
				/>
			</div>

			{/* 문제 정보 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="problemInfo" className="text-right">
					문제 정보
				</Label>
				<Input
					id="problemInfo"
					value={problemInfo}
					onChange={(e) => setProblemInfo(e.target.value)}
					placeholder="예) 알고리즘 3문제"
					className="col-span-3"
				/>
			</div>

			{/* IDE 사용 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label className="text-right">IDE 사용</Label>
				<div className="col-span-3 flex gap-2">
					<Button
						variant={permitIde === '' ? 'default' : 'outline'}
						onClick={() => setPermitIde('')}
					>
						미선택
					</Button>
					<Button
						variant={permitIde === '가능' ? 'default' : 'outline'}
						onClick={() => setPermitIde('가능')}
					>
						가능
					</Button>
					<Button
						variant={permitIde === '불가능' ? 'default' : 'outline'}
						onClick={() => setPermitIde('불가능')}
					>
						불가능
					</Button>
				</div>
			</div>

			{/* 구글링 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label className="text-right">구글링</Label>
				<div className="col-span-3 flex gap-2">
					<Button
						variant={permitSearch === '' ? 'default' : 'outline'}
						onClick={() => setPermitSearch('')}
					>
						미선택
					</Button>
					<Button
						variant={permitSearch === '가능' ? 'default' : 'outline'}
						onClick={() => setPermitSearch('가능')}
					>
						가능
					</Button>
					<Button
						variant={permitSearch === '불가능' ? 'default' : 'outline'}
						onClick={() => setPermitSearch('불가능')}
					>
						불가능
					</Button>
				</div>
			</div>

			{/* 히든 테스트케이스 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label className="text-right">히든 테스트케이스</Label>
				<div className="col-span-3 flex gap-2">
					<Button
						variant={hiddenCase === '' ? 'default' : 'outline'}
						onClick={() => setHiddenCase('')}
					>
						미선택
					</Button>
					<Button
						variant={hiddenCase === '있음' ? 'default' : 'outline'}
						onClick={() => setHiddenCase('있음')}
					>
						있음
					</Button>
					<Button
						variant={hiddenCase === '없음' ? 'default' : 'outline'}
						onClick={() => setHiddenCase('없음')}
					>
						없음
					</Button>
				</div>
			</div>

			{/* 시험 방식 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label className="text-right">시험 방식</Label>
				<div className="col-span-3 flex gap-2">
					<Button variant={examMode === '' ? 'default' : 'outline'} onClick={() => setExamMode('')}>
						미선택
					</Button>
					<Button
						variant={examMode === '대면' ? 'default' : 'outline'}
						onClick={() => setExamMode('대면')}
					>
						대면
					</Button>
					<Button
						variant={examMode === '비대면' ? 'default' : 'outline'}
						onClick={() => setExamMode('비대면')}
					>
						비대면
					</Button>
				</div>
			</div>

			{/* 시험 장소/플랫폼 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="testPlace" className="text-right">
					시험 장소 / 플랫폼
				</Label>
				<Input
					id="testPlace"
					value={testPlace}
					onChange={(e) => setTestPlace(e.target.value)}
					placeholder="예) 온라인 코딩테스트 플랫폼"
					className="col-span-3"
				/>
			</div>

			{/* 비고 */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="note" className="text-right">
					비고
				</Label>
				<Textarea
					id="note"
					value={note}
					onChange={(e) => setNote(e.target.value)}
					placeholder="추가적인 참고사항을 입력하세요."
					className="col-span-3"
				/>
			</div>
		</div>
	);

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>코딩테스트 정보 생성</DialogTitle>
				</DialogHeader>

				{/* 640px 이하라면 ScrollArea로, 그렇지 않으면 일반 div */}
				{isSmallScreen ? (
					<ScrollArea className="h-[400px] sm:h-full">{renderFormFields()}</ScrollArea>
				) : (
					<div>{renderFormFields()}</div>
				)}

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						취소
					</Button>
					<Button type="button" onClick={handleSave} disabled={!supportLanguages.trim()}>
						저장
					</Button>
				</DialogFooter>
			</DialogContent>

			{/* AlertDialog */}
			{alertMessage && (
				<AlertDialog
					defaultOpen
					onOpenChange={(open) => {
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
							<AlertDialogCancel onClick={handleAlertClose}>확인</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</Dialog>
	);
}
