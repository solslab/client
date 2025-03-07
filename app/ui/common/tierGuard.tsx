'use client';
import { infoCheck } from '@/app/lib/server/queries/auth/check';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/lib/utils/cookie';
import TierModal from './tierModal';

interface WithOnClickProps {
	onClick?: (e: React.MouseEvent) => void;
}

export default function TierGuard(props: {
	render: (checkTier: () => Promise<void>) => JSX.Element;
	company_id?: string;
}) {
	const { company_id } = props;
	const [modalVisible, setModalVisible] = useState(false);
	const router = useRouter();

	const checkTier = async () => {
		const tokenCookie = await getToken();
		const token = tokenCookie?.value || undefined;
		if (!token) {
			{
				router.push('/login');
			}
		} else {
			try {
				const infoChecked = await infoCheck(token);
				if (infoChecked) {
					router.push(`/testReview${company_id ? '?company_id=' + company_id : ''}`);
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
			<div className="flex flex-row justify-center">{props.render(checkTier)}</div>
			{modalVisible ? <TierModal setVisible={setModalVisible} /> : <></>}
		</>
	);
}
