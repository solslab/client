'use client';

import { Dispatch, SetStateAction, useActionState, useState } from 'react';
import BasicConfirm from '../common/basicConfirm';
import { deleteMember } from '@/app/lib/server/mutations/auth';
import BasicAlert from '../common/basicAlert';
import { deleteToken, redirectServerAction, redirectToPrev } from '@/app/lib/utils/cookie';
import { DeletionState } from '@/app/lib/types/actions';

export default function DeletionConfirm({
	setVisible
}: {
	setVisible: Dispatch<SetStateAction<boolean>>;
}) {
	const initialState: DeletionState = { submitted: false, message: '' };
	const [state, formAction] = useActionState(deleteMember, initialState);
	return (
		<form action={formAction}>
			{!state.submitted ? (
				<BasicConfirm onCancel={() => setVisible(false)}>
					<div className="flex flex-col text-text-base">
						<div>정말로 탈퇴하시겠습니까?</div>
						<div className="flex justify-center">
							<span className="text-red-warning">모든 정보가 삭제</span>됩니다.
						</div>
					</div>
				</BasicConfirm>
			) : (
				<BasicAlert
					onClick={() => {
						redirectServerAction('/login');
					}}
				>
					{<div className="text-center text-text-base">{state?.message}</div>}
				</BasicAlert>
			)}
		</form>
	);
}
