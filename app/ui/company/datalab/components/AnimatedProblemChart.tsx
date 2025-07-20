'use client';
import { useState, useEffect } from 'react';

const AnimatedProblemChart = () => {
	const [animationTime, setAnimationTime] = useState(0);

	// 애니메이션 타이머
	useEffect(() => {
		let animationId: number;
		let lastTime = 0;

		const animate = (currentTime: number) => {
			if (lastTime === 0) lastTime = currentTime;
			const deltaTime = currentTime - lastTime;
			
			// 16ms (약 60fps)마다 업데이트하여 부드러운 애니메이션 구현
			if (deltaTime >= 16) {
				setAnimationTime(prev => prev + 0.04); // 더 느리게 조정
				lastTime = currentTime;
			}
			
			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, []);

	// 맞힌 문제수 pin의 위치 계산 (좌우 움직임)
	const solvedPinPosition = Math.sin(animationTime * 0.8) * 0.25 + 0.5; // 25% ~ 75% 범위에서 움직임 (우측 10% 공간 확보)

	return (
		<div className="flex h-[210px] flex-col items-center justify-center gap-2 rounded-[10px] border-[1px] border-gray-40">
			<div className="flex w-3/4 flex-col items-center gap-8">
				<div className="relative h-[3px] w-full rounded-full bg-main-light md:h-[6px]">
					{/* 맞힌 문제수 pin - 좌우로 움직임 */}
					<div 
						className="absolute bottom-[12px] text-xs md:bottom-[16px]"
						style={{ left: `${solvedPinPosition * 100}%`, transform: 'translateX(-50%)' }}
					>
						<div className="absolute left-1/2 top-[15px] h-[11px] w-[2px] -translate-x-1/2 bg-main-base"></div>
						?문제
					</div>
					{/* 전체 문제수 pin - 고정 위치 */}
					<div className="absolute bottom-[12px] right-[10%] text-xs md:bottom-[16px]">
						<div className="absolute left-1/2 top-[15px] h-[11px] w-[2px] -translate-x-1/2 bg-main-base"></div>
						?문제
					</div>
				</div>
				<div className="text-center text-xs text-gray-90 md:text-sm">
					<span className="font-bold text-main-base">
						?명
					</span>
					의 합격자가 평균{' '}
					<span className="font-bold text-main-base">
						?문제
					</span>{' '}
					중{' '}
					<span className="font-bold text-main-base">
						?문제
					</span>
					를 해결했습니다
				</div>
			</div>
		</div>
	);
};

export default AnimatedProblemChart; 