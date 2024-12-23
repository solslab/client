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

	const handleSave = () => {
		console.log('기업명:', companyName);
		console.log('산업분야:', selectedIndustryTypes);
		console.log('검색어:', searchTerms);
		console.log('공개여부: ', isPublic);
		onClose();
	};

	// 산업 타입 선택 및 해제
	const handleIndustryTypeSelect = (type: IndustryType) => {
		setSelectedIndustryTypes((prev) =>
			prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
		);
	};

	// 검색어 입력값 변경 함수
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
						Cancel
					</Button>
					<Button type="button" onClick={handleSave} disabled={!companyName}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
