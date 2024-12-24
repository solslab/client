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
import { Company } from '@/app/lib/definitions';
import { updateCompany } from '@/app/lib/data-admin';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

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


type UpdateCompanyModalProps = {
	companyId: string;
	companyDetail: Company;
	onClose: () => void;
	onSuccess?: () => void;
};

export default function UpdateCompanyModal({ companyId, companyDetail, onClose, onSuccess }: UpdateCompanyModalProps) {
	const [companyName, setCompanyName] = useState(companyDetail.company_name);
	const [selectedIndustryTypes, setSelectedIndustryTypes] = useState<string[]>(
		companyDetail.industry_type
	);
	const [redirectLoginAfterClose, setRedirectLoginAfterClose] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [searchTerms, setSearchTerms] = useState(companyDetail.search_terms.join(', '));
	const [isPublic, setIsPublic] = useState<boolean>(companyDetail.public);

	const router = useRouter();

	const handleClose = () => {
		if (redirectLoginAfterClose) {
			router.push('/admin/login');
		} else if (alertMessage === '기업 수정이 완료되었습니다.') {
			onSuccess?.();
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
			const response = await updateCompany(companyId, companyData);
			if (response.status === 200) {
				setAlertMessage('기업 수정이 완료되었습니다.');
			} else {
				setAlertMessage(response.message);
				if (response.status === 401) {
					 setRedirectLoginAfterClose(true);
				}
			}
		} catch (error) {
			setAlertMessage('기업 수정 실패. 다시 시도해주세요.');
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
					<DialogTitle>기업 수정</DialogTitle>
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
						Cancel
					</Button>
					<Button type="button" onClick={handleSave} disabled={!companyName}>
						Save
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
								Close
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</Dialog>
	);
}
