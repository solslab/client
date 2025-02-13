import { useEffect, useState } from 'react';

export function useIsSmallScreen() {
	const [isSmall, setIsSmall] = useState(false);

	useEffect(() => {
		function checkSize() {
			// 640px 이하인지 체크
			setIsSmall(window.innerWidth < 640);
		}
		// 초기 체크
		checkSize();
		// 리사이즈 이벤트 등록
		window.addEventListener('resize', checkSize);
		return () => window.removeEventListener('resize', checkSize);
	}, []);

	return isSmall;
}
