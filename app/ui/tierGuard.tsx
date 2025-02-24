'use client';
import { getToken } from '@/app/lib/cookie';
import { infoCheck } from '@/app/lib/actions';
import {
	Children,
	cloneElement,
	isValidElement,
	ReactElement,
	useCallback,
	useEffect,
	useState
} from 'react';
import { useRouter } from 'next/navigation';
import TierModal from './company/tierModal';

interface WithOnClickProps {
	onClick?: (e: React.MouseEvent) => void;
}

export default function TierGuard( props : { render: (checkTier: () => Promise<void>) => JSX.Element, company_id?: string }) {
    const { company_id } = props;
	const [modalVisible, setModalVisible] = useState(false);
	const router = useRouter();
	const checkTier = useCallback(async () => {
		const tokenCookie = await getToken();
		const token = tokenCookie?.value || undefined;
		if (!token) {
			{
				router.push('/login');
			}
		} else {
			const infoChecked = await infoCheck(token);
			if (infoChecked) {
				router.push(`/testReview${company_id ? '?company_id=' + company_id : ''}`);
			} else {
				setModalVisible(true);
			}
		}
	}, []);
	// const childrenWithProps = Children.map(children, (child) => {
	// 	if (isValidElement(child)) {
	// 		const typedChild = child as ReactElement<WithOnClickProps>;
	// 		return cloneElement(typedChild, {
	// 			onClick: async (e: React.MouseEvent) => {
	// 				console.log('typedChild.props.onClick', typedChild.props.onClick);
	// 				if (typedChild.props.onClick) {
	// 					typedChild.props.onClick(e);
	// 				}
	// 				await checkTier();
	// 			}
	// 		});
	// 	}

	// 	return child;
	// });
	return (
		<>
			<div className="flex flex-row justify-center">{props.render(checkTier)}</div>
			{modalVisible ? <TierModal setVisible={setModalVisible} /> : <></>}
		</>
	);
}
