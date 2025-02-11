'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FullPageScrollProps {
	children: React.ReactNode;
	isSearching: boolean;
}

const FullPageScroll: React.FC<FullPageScrollProps> = ({ children, isSearching }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<HTMLElement[]>([]);
	const [activeSection, setActiveSection] = useState(0);
	const touchStartY = useRef<number>(0);
	const touchEndY = useRef<number>(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleWheel = (e: WheelEvent) => {
			if (isSearching) return;

			e.preventDefault();
			const delta = e.deltaY;
			const currentSection = activeSection;

			if (delta > 0 && currentSection < sectionRefs.current.length - 1) {
				setActiveSection(currentSection + 1);
			} else if (delta < 0 && currentSection > 0) {
				setActiveSection(currentSection - 1);
			}
		};

		// **📌 추가: 터치 이벤트에서 기본 스크롤 방지**
		const handleTouchStart = (e: TouchEvent) => {
			touchStartY.current = e.touches[0].clientY;
		};

		const handleTouchMove = (e: TouchEvent) => {
			const deltaY = touchStartY.current - e.touches[0].clientY;
			touchEndY.current = e.touches[0].clientY;

			// **위아래 스크롤을 막고, 좌우 스크롤은 허용**
			if (Math.abs(deltaY) > 10) {
				e.preventDefault();
			}
		};

		const handleTouchEnd = () => {
			const deltaY = touchStartY.current - touchEndY.current;
			const currentSection = activeSection;

			if (deltaY > 50 && currentSection < sectionRefs.current.length - 1) {
				setActiveSection(currentSection + 1);
			} else if (deltaY < -50 && currentSection > 0) {
				setActiveSection(currentSection - 1);
			}
		};

		container.addEventListener('wheel', handleWheel, { passive: false });
		container.addEventListener('touchstart', handleTouchStart, { passive: false });
		container.addEventListener('touchmove', handleTouchMove, { passive: false });
		container.addEventListener('touchend', handleTouchEnd, { passive: false });

		return () => {
			container.removeEventListener('wheel', handleWheel);
			container.removeEventListener('touchstart', handleTouchStart);
			container.removeEventListener('touchmove', handleTouchMove);
			container.removeEventListener('touchend', handleTouchEnd);
		};
	}, [activeSection, isSearching]);

	useEffect(() => {
		sectionRefs.current[activeSection]?.scrollIntoView({
			behavior: 'smooth'
		});
	}, [activeSection]);

	return (
		<>
			<style jsx global>{`
				footer {
					display: none;
				}
			`}</style>
			<div ref={containerRef} className="h-screen overflow-hidden touch-none">
				{React.Children.map(children, (child, index) => (
					<div
						ref={(el) => {
							if (el) sectionRefs.current[index] = el;
						}}
						className="h-screen w-full snap-start"
					>
						{child}
					</div>
				))}
			</div>
		</>
	);
};

export default FullPageScroll;
