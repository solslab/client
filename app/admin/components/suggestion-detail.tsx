import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/app/ui/shadcn/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/app/ui/shadcn/components/ui/select';
import { Button } from '@/app/ui/shadcn/components/ui/button';
import { useState, useEffect } from 'react';
import { updateSuggestionStatus } from '@/app/lib/server/mutations/admin';
import { getSuggestionDetails } from '@/app/lib/server/queries/admin';
import { SuggestionDetail } from '@/app/lib/types/models';
import { Label } from '@/app/ui/shadcn/components/ui/label';
import { STATUS_OPTIONS } from '@/app/lib/utils/constants';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/app/ui/shadcn/components/ui/alert-dialog';

interface SuggestionDetailProps {
	suggestionId: string;
	onClose: () => void;
	onRefresh: () => void;
}

const SuggestionDetailModal = ({ suggestionId, onClose, onRefresh }: SuggestionDetailProps) => {
	const [suggestion, setSuggestion] = useState<SuggestionDetail | null>(null);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

	const fetchSuggestionDetails = async () => {
		const response = await getSuggestionDetails(suggestionId);
		if (response) {
			setSuggestion(response);
		}
	};

	const handleStatusChange = async (newStatus: string) => {
		if (!suggestion || suggestion.status === newStatus) return;
		const response = await updateSuggestionStatus(suggestion.suggestion_id, newStatus);
		if (response.status === 200) {
			const selectedLabel =
				STATUS_OPTIONS.find((option) => option.value === newStatus)?.label || '알 수 없음';
			setAlertMessage(`처리상태가 '${selectedLabel}'(으)로 변경되었습니다.`);
			onRefresh();
		} else {
			setAlertMessage(`오류: ${response.message || '알 수 없는 오류가 발생했습니다.'}`);
		}
	};

	useEffect(() => {
		fetchSuggestionDetails();
	}, [suggestionId]);

	if (!suggestion) return null;

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>정보수정요청 상세정보</DialogTitle>
				</DialogHeader>
				<div className="grid gap-5 pl-2 pt-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">기업명</Label>
						<span className="col-span-3">{suggestion.company_name}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">시험명</Label>
						<span className="col-span-3">{suggestion.position_name}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">작성자명</Label>
						<span className="col-span-3">{suggestion.member_name}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">이메일</Label>
						<span className="col-span-3">{suggestion.member_email}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">내용</Label>
						<span className="col-span-3">{suggestion.suggestion_content}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">요청날짜</Label>
						<span className="col-span-3">{suggestion.created_date}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">처리상태</Label>
						<Select onValueChange={handleStatusChange}>
							<SelectTrigger className="w-[180px]">
								<SelectValue
									placeholder={
										STATUS_OPTIONS.find((option) => option.value === suggestion.status)?.label ||
										'선택'
									}
								/>
							</SelectTrigger>

							<SelectContent>
								{STATUS_OPTIONS.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={onClose}>닫기</Button>
				</DialogFooter>
			</DialogContent>

			{alertMessage && (
				<AlertDialog defaultOpen onOpenChange={() => setAlertMessage(null)}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>알림</AlertDialogTitle>
							<AlertDialogDescription>{alertMessage}</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setAlertMessage(null)}>확인</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</Dialog>
	);
};

export default SuggestionDetailModal;
