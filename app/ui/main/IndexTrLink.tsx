'use client';

export default function IndexTrLink({ onClick }: { onClick: () => Promise<void> }) {
	return (
		<>
			<button
				onClick={onClick}
				type="button"
				className="rounded-[10px] border-2 border-main-base px-3 py-2 text-center font-bold text-main-base md:px-6 md:py-4"
			>
				코딩테스트 후기 작성하기
			</button>
		</>
	);
}
