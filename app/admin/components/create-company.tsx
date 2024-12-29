import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { createCompany } from '@/app/lib/data-admin';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';

type IndustryType =
	| 'IT 서비스'
	| '금융'
	| '솔루션'
	| '게임'
	| 'SI'
	| 'SM'
	| '빅테크'
	| '스타트업'
	| '대기업'
	| '중견기업'
	| '중소기업'
	| '공기업';

export default function CreateCompanyModal({ onClose }: { onClose: () => void }) {
	const [companyName, setCompanyName] = useState('');
	const [selectedIndustryTypes, setSelectedIndustryTypes] = useState<IndustryType[]>([]);
	const [searchTerms, setSearchTerms] = useState('');
	const [isPublic, setIsPublic] = useState<boolean>(true);
	const [redirectLoginAfterClose, setRedirectLoginAfterClose] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [companyId, setCompanyId] = useState<string | null>(null);

	const router = useRouter();
	const basePath = useIsAdminDomain() ? '' : '/admin';

	const handleClose = () => {
    	if (redirectLoginAfterClose) {
			router.push(`${basePath}/login`);
		} else if (companyId) {
			router.push(`${basePath}/company/${companyId}`); // companyId를 이용한 라우팅
		}
  	}

	const handleSave = async () => {
		setAlertMessage('');
		try {
			const companyData = {
				company_name: companyName,
				industry_type: selectedIndustryTypes,
				search_terms: searchTerms.split(',').map((term) => term.trim()),
				is_public: isPublic
			};
			const response = await createCompany(companyData);
			if (response.company_id) {
				setAlertMessage('기업 생성이 완료되었습니다.');
				setCompanyId(response.company_id);
			} else {
				setAlertMessage(response.message);
				if (response.status === 401) {
					 setRedirectLoginAfterClose(true);
				}
			}
		} catch (error) {
			setAlertMessage('기업 생성 실패. 다시 시도해주세요.');
		}
	};

	const handleIndustryTypeSelect = (type: IndustryType) => {
		setSelectedIndustryTypes((prev) =>
			prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
		);
	};

	const handleSearchTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerms(e.target.value);
	};

	const handlePublicStatusChange = (status: boolean) => {
		setIsPublic(status);
	};

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>기업 생성</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="companyName" className="text-right">
							기업명
						</Label>
						<Input
							id="companyName"
							value={companyName}
							placeholder="필수 입력"
							onChange={(e) => setCompanyName(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-top text-right">산업분야</Label>
						<div className="col-span-3 flex flex-wrap gap-2">
							{[
								'IT 서비스',
								'금융',
								'솔루션',
								'게임',
								'SI',
								'SM',
								'빅테크',
								'스타트업',
								'대기업',
								'중견기업',
								'중소기업',
								'공기업'
							].map((type) => (
								<Button
									key={type}
									variant={
										selectedIndustryTypes.includes(type as IndustryType) ? 'default' : 'outline'
									}
									onClick={() => handleIndustryTypeSelect(type as IndustryType)}
								>
									{type}
								</Button>
							))}
						</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="searchTerms" className="text-right">
							검색어
						</Label>
						<Input
							id="searchTerms"
							value={searchTerms}
							onChange={handleSearchTermsChange}
							placeholder="반점(,)으로 구분"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-top text-right">공개 여부</Label>
						<div className="col-span-3 flex flex-wrap gap-2">
							<Button
								variant={isPublic === true ? 'default' : 'outline'}
								onClick={() => handlePublicStatusChange(true)}
							>
								공개
							</Button>
							<Button
								variant={isPublic === false ? 'default' : 'outline'}
								onClick={() => handlePublicStatusChange(false)}
							>
								비공개
							</Button>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						취소
					</Button>
					<Button type="button" onClick={handleSave} disabled={!companyName}>
						저장
					</Button>
				</DialogFooter>
			</DialogContent>
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
								확인
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</Dialog>
	);
}
