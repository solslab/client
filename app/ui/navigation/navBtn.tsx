'use client';


import ProfileDropdown from './profileDropdown';
import { useState, useEffect, useCallback } from 'react';
import { usePathname,} from 'next/navigation';
import NavSearchBox from './navSearchBox';
import MobileNavSearchBox from './mobileNavSearchBox';

const exception = ['/login'];

export default function NavBtn() {
	const pathName = usePathname();
	const [userName, setUserName] = useState('');
	const [visible, setVisible] = useState(true);
	const [innerWidth, setInnerWidth] = useState(0);


	const containsException = useCallback((path: string) => {
		return exception.some((exceptionStr) => path.includes(exceptionStr));
	}, []);

	useEffect(() => {
		const handleInnerWidth = () => {
			setInnerWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleInnerWidth);
		setInnerWidth(window.innerWidth);
		return () => {
			window.removeEventListener('resize', handleInnerWidth);
		};
	}, []);

	useEffect(() => {
		const isContain = containsException(pathName);
		if (isContain) {
			setVisible(false);
		} else {
			setVisible(true);
		}
	}, [pathName]);

	return (
		<>
			<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
				<MobileNavSearchBox visible={innerWidth < 640} />
				<NavSearchBox visible={innerWidth > 640} />
				<div className="relative ml-3">
					{
						visible?
						<ProfileDropdown userName={userName} visible={innerWidth > 640} />
						:
						<></>
					}

				</div>
			</div>
		</>
	);
}
