'use client';

import { useEffect } from 'react';

export default function ScrollbarHandler() {
	useEffect(() => {
		let scrollTimer: NodeJS.Timeout;

		const handleScroll = () => {
			console.log('스크롤 감지!'); // 디버깅용

			// 스크롤 중일 때 클래스 추가
			document.body.classList.add('scrolling');

			// 기존 타이머 클리어
			clearTimeout(scrollTimer);

			// 스크롤이 멈춘 후 1초 뒤에 스크롤바 색상 원래대로
			scrollTimer = setTimeout(() => {
				console.log('스크롤 멈춤, 클래스 제거'); // 디버깅용
				document.body.classList.remove('scrolling');
			}, 1000);
		};

		// 여러 요소에 스크롤 이벤트 리스너 추가
		window.addEventListener('scroll', handleScroll, { passive: true });
		document.addEventListener('scroll', handleScroll, { passive: true });

		// 모든 스크롤 가능한 요소에 이벤트 추가
		const scrollableElements = document.querySelectorAll('*');
		const scrollListeners: Array<{ element: Element; handler: EventListener }> = [];

		scrollableElements.forEach((element) => {
			if (
				element.scrollHeight > element.clientHeight ||
				element.scrollWidth > element.clientWidth
			) {
				const elementHandler = () => {
					console.log('요소 스크롤 감지:', element); // 디버깅용
					element.classList.add('scrolling');

					clearTimeout(scrollTimer);
					scrollTimer = setTimeout(() => {
						element.classList.remove('scrolling');
					}, 1000);
				};

				element.addEventListener('scroll', elementHandler, { passive: true });
				scrollListeners.push({ element, handler: elementHandler });
			}
		});

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('scroll', handleScroll);

			// 개별 요소 리스너 제거
			scrollListeners.forEach(({ element, handler }) => {
				element.removeEventListener('scroll', handler);
			});

			clearTimeout(scrollTimer);
		};
	}, []);

	return null;
}
