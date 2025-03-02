'use client';

type ReviewButtonProps = {
	className?: string;
	text?: string;
	onClick?: (e: React.MouseEvent) => void;
};

const ReviewButton = ({ className = '', onClick }: ReviewButtonProps) => {
	return (
		<button
			className={`rounded-[10px] border-[2px] border-main-base px-7 py-4 font-bold text-main-base transition-colors duration-200 hover:bg-main-base hover:text-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
			onClick={onClick}
		>
			코딩테스트 후기 작성하고 모든 정보 열람하기!
		</button>
	);
};

export default ReviewButton;
