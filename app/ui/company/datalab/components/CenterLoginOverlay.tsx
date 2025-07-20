'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/lib/utils/cookie';
import { infoCheck } from '@/app/lib/server/queries/auth/check';
import TierModal from '@/app/ui/common/tierModal';
import { Button } from '@/app/ui/shadcn/components/ui/button';

interface CenterLoginOverlayProps {
	company_id?: string;
}

export default function CenterLoginOverlay({ company_id }: CenterLoginOverlayProps) {
	const [modalVisible, setModalVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const router = useRouter();

	const handleLoginClick = async () => {
		const tokenCookie = await getToken();
		const token = tokenCookie?.value || undefined;
		
		if (!token) {
			router.push('/login');
		} else {
			try {
				const infoChecked = await infoCheck(token);
				if (infoChecked) {
					router.push('/testReview');
				} else {
					setModalVisible(true);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<>
			{/* DataLabSection 중앙/상단에 로그인 유도 버튼 */}
			<div className="pointer-events-none absolute left-0 right-0 top-52 bottom-10 z-50 flex items-start justify-center pt-8 md:items-center md:pt-0 md:top-0">
				<div className="pointer-events-auto">
					<div className="flex max-w-md flex-col items-center gap-6 rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
						<div className="text-center">
							<h2 className="mb-2 text-xl font-bold text-gray-800">
								로그인, 후기 작성까지 3분이면 끝나요!
							</h2>
						</div>
						<div className="px-8 text-left">
							<p className="mb-2 text-sm text-gray-400">
								• 1회만 작성하면 모든 통계와 후기를 확인할 수 있어요.
							</p>
							<p className="mb-2 text-sm text-gray-400">
								• 더 나은 정보 제공을 위해 함께해 주세요!
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<Button
								onClick={handleLoginClick}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								variant="main"
								size="lg"
								className="group relative overflow-hidden text-base py-4 font-semibold transition-all duration-300 hover:shadow-lg"
							>
								<span className="relative z-10 flex items-center gap-2">
									<span>코딩테스트 후기 작성하고 모든 정보 열람하기</span>
									<svg
										className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 7l5 5m0 0l-5 5m5-5H6"
										/>
									</svg>
								</span>
								<div className="from-main-dark absolute inset-0 bg-gradient-to-r to-main-base opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
							</Button>
						</div>
					</div>
				</div>
			</div>
			{/* Tier Modal */}
			{modalVisible && <TierModal setVisible={setModalVisible} />}
		</>
	);
} 