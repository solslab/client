'use client';

export default function TrLink({ onClick }: { company_id?: string,onClick:()=>Promise<void> }) {


	return (
		<>
				<button
					onClick={onClick
					}
					type="button"
					className="rounded-md bg-main-base px-6 py-3 text-lg text-white max-sm:text-base"
				>
					코딩테스트 후기 작성하기
				</button>

		</>
	);
}
