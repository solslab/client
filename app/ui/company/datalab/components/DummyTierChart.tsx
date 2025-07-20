'use client';
import { ResponsiveBar, BarLayer, ComputedBarDatum } from '@nivo/bar';
import { useState, useEffect } from 'react';

const tiers = ['브론즈', '실버', '골드', '플래티넘', '다이아', '루비'];
const ranks = ['1', '2', '3', '4', '5'];

interface TierData {
	tier: string;
	total: number;
	[key: string]: string | number;
}

interface ColorMap {
	[key: string]: string;
}

const generateDummyData = (time: number) => {
	// 시간에 따라 변하는 더미 데이터 생성
	const baseValues = [
		[2, 3, 1, 0, 0], // 브론즈
		[4, 6, 3, 2, 1], // 실버
		[8, 12, 7, 4, 2], // 골드
		[6, 9, 5, 3, 1], // 플래티넘
		[3, 5, 2, 1, 0], // 다이아
		[1, 2, 1, 0, 0]  // 루비
	];

	return tiers.map((tier, tierIndex) => {
		const tierData: TierData = { tier, total: 0 };
		let total = 0;

		ranks.forEach((rank, rankIndex) => {
			const baseValue = baseValues[tierIndex][rankIndex];
			// 더 역동적인 변화를 위해 여러 사인파 조합 (250% 변화 범위)
			const variation1 = Math.sin(time * 0.8 + tierIndex * 0.8 + rankIndex * 0.5) * 0.8;
			const variation2 = Math.sin(time * 0.6 + tierIndex * 1.2 + rankIndex * 0.7) * 0.5;
			const variation3 = Math.sin(time * 1.0 + tierIndex * 0.3 + rankIndex * 1.0) * 0.3;
			const variation4 = Math.sin(time * 0.4 + tierIndex * 0.9 + rankIndex * 0.8) * 0.2;
			const totalVariation = variation1 + variation2 + variation3 + variation4 + 1;
			const value = Math.max(0, Math.round(baseValue * totalVariation));
			tierData[`${tier}${rank}`] = value;
			total += value;
		});

		tierData.total = total;
		return tierData;
	});
};

const generateColors = () => {
	const baseColors = {
		브론즈: ['#CD7F32', '#8B4513'],
		실버: ['#dbe1e3', '#A5A9AB'],
		골드: ['#FFD700', '#b99e16'],
		플래티넘: ['#abf5e1', '#2fd1ae'],
		다이아: ['#bdeffa', '#7bceff'],
		루비: ['#E0115F', '#9B111E']
	};

	const colors: ColorMap = {};
	Object.entries(baseColors).forEach(([tier, [start, end]]) => {
		ranks.forEach((rank, index) => {
			const ratio = (ranks.length - 1 - index) / (ranks.length - 1);
			const r = Math.round(
				parseInt(start.slice(1, 3), 16) * (1 - ratio) + parseInt(end.slice(1, 3), 16) * ratio
			);
			const g = Math.round(
				parseInt(start.slice(3, 5), 16) * (1 - ratio) + parseInt(end.slice(3, 5), 16) * ratio
			);
			const b = Math.round(
				parseInt(start.slice(5, 7), 16) * (1 - ratio) + parseInt(end.slice(5, 7), 16) * ratio
			);
			colors[`${tier}${rank}`] = `#${r.toString(16).padStart(2, '0')}${g
				.toString(16)
				.padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
		});
	});
	return colors;
};

const colors = generateColors();

const DummyTierChart = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [animationData, setAnimationData] = useState<TierData[]>([]);
	const [isAnimating, setIsAnimating] = useState(false);
	const [animationTime, setAnimationTime] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 560);
		};
		
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		// 애니메이션 시작
		setIsAnimating(true);
		
		// 초기 데이터 (모든 값이 0)
		const initialData = tiers.map((tier) => {
			const tierData: TierData = { tier, total: 0 };
			ranks.forEach((rank) => {
				tierData[`${tier}${rank}`] = 0;
			});
			return tierData;
		});
		
		setAnimationData(initialData);

		// 1초 후에 실제 더미 데이터로 애니메이션
		const timer = setTimeout(() => {
			setAnimationData(generateDummyData(0));
			setIsAnimating(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	// 무한 애니메이션을 위한 타이머
	useEffect(() => {
		if (isAnimating) return; // 초기 로딩 중일 때는 실행하지 않음

		let animationId: number;
		let lastTime = 0;

		const animate = (currentTime: number) => {
			if (lastTime === 0) lastTime = currentTime;
			const deltaTime = currentTime - lastTime;
			
			// 16ms (약 60fps)마다 업데이트하여 부드러운 애니메이션 구현
			if (deltaTime >= 16) {
				setAnimationTime(prev => prev + 0.05); // 더 작은 증분으로 부드럽게
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
	}, [isAnimating]);

	// animationTime이 변경될 때마다 데이터 업데이트
	useEffect(() => {
		if (!isAnimating) {
			setAnimationData(generateDummyData(animationTime));
		}
	}, [animationTime, isAnimating]);

	const maxTotal = Math.max(...animationData.map((d) => d.total), 1);

	const CustomLayer: BarLayer<TierData> = ({ bars }) => {
		// 숫자 표시 제거 - 빈 컴포넌트 반환
		return <g></g>;
	};

	return (
		<div style={{ height: '100%', width: '100%', position: 'relative' }}>
			{isAnimating && (
				<div 
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						zIndex: 10,
						background: 'rgba(255, 255, 255, 0.9)',
						padding: '10px 20px',
						borderRadius: '8px',
						fontSize: '14px',
						fontWeight: 'bold',
						color: '#666'
					}}
				>
					데이터 로딩 중...
				</div>
			)}
			<ResponsiveBar
				tooltip={({ id, value }) => {
					const formattedId = String(id).replace(/(\D+)(\d)/, '$1 $2');
					return (
						<div style={{ 
							fontSize: '13px', 
							fontWeight: "400", 
							background: 'white', 
							padding: '5px', 
							borderRadius: '4px', 
							border: '1px solid #ddd' 
						}}>
							<strong>{formattedId}</strong>: {value}명
						</div>
					);
				}}
				data={animationData}
				keys={tiers.flatMap((tier) => ranks.map((rank) => `${tier}${rank}`))}
				indexBy="tier"
				margin={{ top: 40, right: 10, bottom: 30, left: 20 }}
				padding={0.4}
				groupMode="stacked"
				valueScale={{ type: 'linear', max: maxTotal * 1.2 }}
				colors={({ id }) => colors[id]}
				borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
				borderWidth={0.6}
				borderRadius={1}
				enableLabel={false}
				animate={true}
				theme={{
					axis: {
						ticks: {
							line: {
								stroke: '#666666'
							},
							text: {
								fontFamily: 'Arial'
							}
						}
					},
					labels: {
						text: {
							fontSize: 8,
							fontWeight: 'bold'
						}
					}
				}}
				axisBottom={{
					tickSize: 0,
					tickPadding: 5,
					tickRotation: 0
				}}
				axisLeft={null}
				layers={['axes', 'bars', CustomLayer]}
			/>
		</div>
	);
};

export default DummyTierChart; 