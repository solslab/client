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
import { getTestInfo } from '@/app/lib/data-admin'; // 데이터 fetch 함수
import { TestData } from '@/app/lib/definitions'; // 타입 정의

type TestInfoModalProps = {
	testInfoId: string;
	onClose: () => void;
};

export default function TestInfoModal({ testInfoId, onClose }: TestInfoModalProps) {
	const [testInfo, setTestInfo] = useState<TestData | undefined>(undefined);

	useEffect(() => {
		const fetchTestInfo = async () => {
			const data = await getTestInfo(testInfoId);
			setTestInfo(data);
		};

		if (testInfoId) fetchTestInfo();
	}, [testInfoId]);

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>코딩테스트 상세정보</DialogTitle>
				</DialogHeader>
				<div className="grid gap-8 py-4">
					{/* 공통 스타일 */}
					{[
						{ label: '이름', value: testInfo?.position_name},
						{ label: '공식 여부', value: testInfo?.is_official ? '공식' : '비공식' },
						{ label: '지원 언어', value: testInfo?.support_languages.join(', ') || '-' },
						{ label: '시험 시간', value: testInfo?.test_time || '-' },
						{ label: '문제 정보', value: testInfo?.problem_info || '-' },
						{ label: 'IDE 사용', value: testInfo?.permit_ide || '-' },
						{ label: '구글링', value: testInfo?.permit_search || '-' },
						{ label: '히든 테스트케이스', value: testInfo?.hidden_case || '-' },
						{ label: '시험 방식', value: testInfo?.exam_mode || '-' },
						{ label: '시험 장소 / 플랫폼', value: testInfo?.test_place || '-' },
						{ label: '비고', value: testInfo?.note || '-' }
					].map(({ label, value }) => (
						<div key={label} className="grid grid-cols-[1fr,3fr] items-center gap-8">
							<Label className="text-right">{label}</Label>
							<p className="truncate">{value}</p>
						</div>
					))}
				</div>
				<DialogFooter>
					<Button onClick={onClose}>닫기</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
