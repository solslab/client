import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getReviewDetails } from '@/app/lib/data-admin';
import { Label } from '@/components/ui/label';
import { ReviewDetail } from '@/app/lib/definitions';

interface ReviewDetailProps {
	trId: string;
	onClose: () => void;
}

const ReviewDetailModal = ({ trId, onClose }: ReviewDetailProps) => {
	const [review, setReview] = useState<ReviewDetail | null>(null);

	useEffect(() => {
		const fetchReviewDetails = async () => {
			const response = await getReviewDetails(trId);
			if (response) {
				setReview(response);
			}
		};
		fetchReviewDetails();
	}, [trId]);

	if (!review) return null;

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>리뷰 상세정보</DialogTitle>
				</DialogHeader>
				<div className="grid gap-5 pl-2 pt-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							기업명
						</Label>
						<span className="col-span-3">{review.company_name}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="nickname" className="text-right">
							작성자
						</Label>
						<span className="col-span-3">{review.member_name}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							티어
						</Label>
						<span className="col-span-3">{review.member_tier}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="social_type" className="text-right">
							응시년도
						</Label>
						<span className="col-span-3">{review.tr_year}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="member_tier" className="text-right">
							직무
						</Label>
						<span className="col-span-3">{review.tr_position}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="member_tier" className="text-right">
							채용형태
						</Label>
						<span className="col-span-3">{review.tr_career}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="member_tier" className="text-right">
							전체 문제수
						</Label>
						<span className="col-span-3">{review.tr_problem_num}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="member_tier" className="text-right">
							푼 문제수
						</Label>
						<span className="col-span-3">{review.tr_solved_num}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="prefer_languages" className="text-right">
							문제유형
						</Label>
						<span className="col-span-3">
							{Array.isArray(review?.tr_problem_type) && review?.tr_problem_type.length
								? review?.tr_problem_type.join(', ')
								: '없음'}
						</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="member_tier" className="text-right">
							합격여부
						</Label>
						<span className="col-span-3">{review.tr_pass_status}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="member_tier" className="text-right">
							한줄후기
						</Label>
						<span className="col-span-3">{review.tr_comment}</span>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={onClose}>닫기</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ReviewDetailModal;
