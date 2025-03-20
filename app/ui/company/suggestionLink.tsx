'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SuggestionLink({
	company_id,
	company_name
}: {
	company_id?: string;
	company_name: string;
}) {
	const [modalVisible, setModalVisible] = useState(false);
	const router = useRouter();
	const handleClick = () => {
		window.location.href = `mailto:solslab24@gmail.com?subject=${company_name} 코딩 테스트 정보 추가 요청`;
	};

	return (
		<>
			<div>
				<button
					onClick={handleClick}
					type="button"
					className="rounded-md border-2 border-main-base px-7 py-4 text-sm font-bold text-main-base"
				>
					{company_name} 코딩테스트 정보 추가하기
				</button>
			</div>
		</>
	);
}
