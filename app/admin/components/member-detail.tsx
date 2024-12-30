import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getMemberDetails } from '@/app/lib/data-admin';
import { User } from '@/app/lib/definitions';
import { Label } from '@/components/ui/label';

interface MemberDetailProps {
	memberKey: string;
	onClose: () => void;
}

const MemberDetailModal = ({ memberKey, onClose }: MemberDetailProps) => {
	const [member, setMember] = useState<User | null>(null);

	useEffect(() => {
		const fetchMemberDetails = async () => {
			const response = await getMemberDetails(memberKey);
			if (response) {
				setMember(response);
			}
		};
		fetchMemberDetails();
	}, [memberKey]);

	if (!member) return null;

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>회원 상세정보</DialogTitle>
				</DialogHeader>
				<div className="grid gap-5 pl-2 pt-4">
					{/* 이름 */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							이름
						</Label>
						<span className="col-span-3">{member.name}</span>
					</div>
					{/* 닉네임 */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="nickname" className="text-right">
							닉네임
						</Label>
						<span className="col-span-3">{member.nickname}</span>
					</div>

					{/* 이메일 */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							이메일
						</Label>
						<span className="col-span-3">{member.email}</span>
					</div>

					{/* 가입 방식 */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="social_type" className="text-right">
							가입 방식
						</Label>
						<span className="col-span-3">{member.social_type}</span>
					</div>

					{/* 티어 */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="member_tier" className="text-right">
							티어
						</Label>
						<span className="col-span-3">
							{member?.member_tier && member?.al_platform
								? `${member?.member_tier} (${member?.al_platform})`
								: '없음'}
						</span>
					</div>
					{/* 선호 언어 */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="prefer_languages" className="text-right">
							선호 언어
						</Label>
						<span className="col-span-3">
							{Array.isArray(member?.prefer_languages) && member?.prefer_languages.length
								? member?.prefer_languages.join(', ')
								: '없음'}
						</span>
					</div>
					{/* 취업 희망 분야 */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="prefer_industries" className="text-right">
							취업 희망 분야
						</Label>
						<span className="col-span-3">
							{Array.isArray(member?.prefer_industries) && member?.prefer_industries.length
								? member?.prefer_industries.join(', ')
								: '없음'}
						</span>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={onClose}>닫기</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default MemberDetailModal;
