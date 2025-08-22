'use client';
import Link from 'next/link';

export default function SuggestionBtn({
	company_id,
	position_id
}: {
	company_id: string;
	position_id: string;
}) {
	return (
		<Link
			href={`/company/${company_id}/suggestion?position=${position_id}`}
			className="w-36 rounded-md bg-main-light px-6 py-3 text-main-base"
		>
			정보 수정 요청
		</Link>
	);
}
