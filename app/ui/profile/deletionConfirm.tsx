"use client";

import { Dispatch, SetStateAction, useActionState, useState } from "react";
import BasicConfirm from "../basicConfirm";
import { DeletionState, deleteMember } from "@/app/lib/auth";
import BasicAlert from "../basicAlert";
import { redirectToPrev } from "@/app/lib/cookie";

export default function DeletionConfirm({setVisible}:{setVisible:Dispatch<SetStateAction<boolean>>}) {
  const initialState: DeletionState = { message: null, submitted: false };
  const [state, formAction] = useActionState(deleteMember, initialState);
  return (
    <form action={formAction}>
      {!state.submitted ? (
        <BasicConfirm onCancel={()=>setVisible(false)}>
            <div className="flex flex-col space-x-4 text-text-base">
            <div>정말로 탈퇴하시겠습니까?</div>
            <div><span className="text-red-warning">모든 정보가 삭제</span>됩니다.</div>
            </div>
          
        </BasicConfirm>
      ) : (
        <BasicAlert onClick={()=>redirectToPrev()}>
            {
               <div className="text-text-base text-center">{state?.message}</div> 
            }
        </BasicAlert>
      )}
    </form>
  );
}
