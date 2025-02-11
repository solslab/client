'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { createTestInfo } from '@/app/lib/data-admin'; // 새 시험정보 생성 API
import { useRouter } from 'next/navigation';
import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';

type CreatePositionModalProps = {
  companyId: string;        // 기업 ID
  onClose: () => void;      // 모달 닫기
  onSuccess?: () => void;   // 성공 후 추가 작업이 필요할 때
};

export default function CreatePositionModal({
  companyId,
  onClose,
  onSuccess,
}: CreatePositionModalProps) {
  // 각 필드 상태
  const [positionName, setPositionName] = useState('');
  const [isOfficial, setIsOfficial] = useState<boolean>(false);
  const [supportLanguages, setSupportLanguages] = useState(''); // 입력창은 CSV로 관리
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
  const [newPositionId, setNewPositionId] = useState<number | null>(null);

  const router = useRouter();
  const basePath = useIsAdminDomain() ? '' : '/admin';

  // AlertDialog 닫힐 때 처리
  const handleAlertClose = () => {
    if (redirectLoginAfterClose) {
      router.push(`${basePath}/login`);
    } else if (alertMessage === '시험정보 생성이 완료되었습니다.')  {
      onSuccess?.();
    }
  };

  // 시험정보 생성
  const handleSave = async () => {
    setAlertMessage('');

    try {
      // API에 맞게 body 데이터 구성
      const requestBody = {
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
        note: note,
      };

      const response = await createTestInfo(companyId, requestBody);

      if (response.status === 200) {
        // 성공
        setAlertMessage('시험정보 생성이 완료되었습니다.');
        if (response.data && typeof response.data.position_id === 'number') {
          setNewPositionId(response.data.position_id);
        }
      } else {
        // 오류 (401 등) 처리
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

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>코딩테스트 정보 생성</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
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
            <Textarea
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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            // 필수값인 positionName만 간단히 체크 (추가로 원하는 필드가 있다면 조건 강화)
            disabled={!positionName}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* AlertDialog: 생성 성공/에러 알림 */}
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
    </Dialog>
  );
}
