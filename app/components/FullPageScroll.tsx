'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FullPageScrollProps {
	children: React.ReactNode;
}

const FullPageScroll: React.FC<FullPageScrollProps> = ({ children }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<HTMLElement[]>([]);
	const [activeSection, setActiveSection] = useState(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
			const delta = e.deltaY;
			const currentSection = activeSection;

			if (delta > 0 && currentSection < sectionRefs.current.length - 1) {
				setActiveSection(currentSection + 1);
			} else if (delta < 0 && currentSection > 0) {
				setActiveSection(currentSection - 1);
			}
		};

		container.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			container.removeEventListener('wheel', handleWheel);
		};
	}, [activeSection]);

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
			<div ref={containerRef} className="h-screen overflow-hidden">
				{React.Children.map(children, (child, index) => (
					<div
						ref={(el) => (sectionRefs.current[index] = el as HTMLElement)}
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
