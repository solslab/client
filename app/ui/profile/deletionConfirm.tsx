'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/app/ui/shadcn/components/ui/dialog';
import { Button } from '@/app/ui/shadcn/components/ui/button';
import { useActionState, Dispatch, SetStateAction } from 'react';
import { deleteMember } from '@/app/lib/server/mutations/auth';
import { redirectServerAction } from '@/app/lib/utils/cookie';
import { DeletionState } from '@/app/lib/types/actions';
import { X } from 'lucide-react';

export default function DeletionConfirm({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }) {
  const initialState: DeletionState = { submitted: false, message: '' };
  const [state, formAction] = useActionState(deleteMember, initialState);

  return (
    <Dialog open={true} onOpenChange={() => setVisible(false)}>
      <DialogContent className="w-full max-w-md flex flex-col pt-10">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4 bg-gray-50" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <form action={formAction} className="flex flex-col gap-6">
          {!state.submitted ? (
            <>
              <DialogDescription className="text-center text-base py-12">
                정말로 탈퇴하시겠습니까?
                <br />
                <span className="font-semibold">모든 정보가 삭제</span>됩니다.
              </DialogDescription>
              <div className="flex justify-center gap-4 mt-2">
                <Button type="submit" variant="destructive" className="w-28">탈퇴</Button>
                <Button type="button" variant="outline" className="w-28" onClick={() => setVisible(false)}>
                  취소
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="text-center text-base mb-8">{state?.message}</div>
              <Button onClick={() => redirectServerAction('/login')} className="w-28 bg-main-base hover:bg-main-base/90 text-white">
                확인
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
