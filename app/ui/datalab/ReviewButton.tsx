import { useRouter } from 'next/navigation';
import { tokenTest } from '@/app/lib/auth';

type ReviewButtonProps = {
	className?: string;
	text?: string;
};

const ReviewButton = ({
	className = '',
}: ReviewButtonProps) => {
	const router = useRouter();

	const handleClick = async () => {
		try {
			const authResult = await tokenTest('USER');

			if (!authResult) {
				// 로그인이 필요한 경우 로그인 페이지로 리다이렉트
				router.push('/login'); // 실제 로그인 페이지 경로로 수정해주세요
				return;
			}

			// 로그인이 되어있는 경우 리뷰 작성 페이지로 이동
			router.push('/testReview'); // 실제 리뷰 작성 페이지 경로로 수정해주세요
		} catch (error) {
			console.error('Auth check failed:', error);
			// 에러 발생시 로그인 페이지로 리다이렉트
			router.push('/login');
		}
	};

	return (
		<button
			onClick={handleClick}
			className={`rounded-[10px] border-[2px] border-main-base px-7 py-4 font-bold text-main-base transition-colors duration-200 hover:bg-main-base hover:text-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
		>
			코딩테스트 후기 작성하고 모든 정보 열람하기!
		</button>
	);
};

export default ReviewButton;
