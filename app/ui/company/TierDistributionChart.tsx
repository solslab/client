'use client';
import { ResponsiveBar, BarLayer, ComputedBarDatum } from '@nivo/bar';

const tiers = ['브론즈', '실버', '골드', '플래티넘', '다이아', '루비'];
const ranks = ['5', '4', '3', '2', '1'];

interface TierData {
	tier: string;
	total: number;
	[key: string]: string | number;
}

interface DataLabDetail {
	member_tier: number;
	tr_pass_status: string;
}

interface Props {
	data: DataLabDetail[];
}

const generateData = (dataLabDetails: DataLabDetail[]) => {
	const passedData = dataLabDetails.filter((item) => item.tr_pass_status === '합격');

	return tiers.map((tier) => {
		const tierData: TierData = { tier, total: 0 };
		let total = 0;

		const tierToNumber: { [key: string]: number } = {
			브론즈: 1,
			실버: 2,
			골드: 3,
			플래티넘: 4,
			다이아: 5,
			루비: 6
		};

		ranks.forEach((rank) => {
			const value = passedData.filter(
				(d) =>
					Math.floor(d.member_tier / 5) + 1 === tierToNumber[tier] &&
					(d.member_tier % 5 || 5) === parseInt(rank)
			).length;

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

interface ColorMap {
	[key: string]: string;
}

const colors = generateColors();

const TierDistributionChart = ({ data: dataLabDetails }: Props) => {
	const chartData = generateData(dataLabDetails);
	const maxTotal = Math.max(...chartData.map((d) => d.total));

	const CustomLayer: BarLayer<TierData> = ({ bars }) => {
		interface TierBars {
			[key: string]: Array<ComputedBarDatum<TierData>>;
		}
		const tierBars: TierBars = {};
		bars.forEach((bar) => {
			const tier = bar.data.indexValue;
			if (!tierBars[tier]) {
				tierBars[tier] = [];
			}
			tierBars[tier].push(bar);
		});

		return (
			<g>
				{Object.entries(tierBars).map(([tier, bars]) => {
					// Find the topmost bar (smallest y value)
					const topBar = bars.reduce((prevBar, currBar) =>
						currBar.y < prevBar.y ? currBar : prevBar
					);
					const tierData = chartData.find((d) => d.tier === tier);
					const total = tierData?.total ?? 0;
					const x = topBar.x + topBar.width / 2;
					const y = topBar.y - 5; // Adjust as needed
					return (
						<text
							key={tier}
							x={x}
							y={y}
							textAnchor="middle"
							style={{
								fill: '#000',
								fontSize: 12,
								fontWeight: 'bold'
							}}
						>
							{total}
						</text>
					);
				})}
			</g>
		);
	};

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<ResponsiveBar
				data={chartData}
				keys={tiers.flatMap((tier) => ranks.map((rank) => `${tier}${rank}`))}
				indexBy="tier"
				margin={{ top: 40, right: 10, bottom: 30, left: 50 }}
				padding={0.2}
				groupMode="stacked"
				valueScale={{ type: 'linear', max: maxTotal * 1.2 }}
				colors={({ id }) => colors[id]}
				borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
				borderWidth={1}
				borderRadius={1}
				enableLabel={false}
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
				axisLeft={{
					tickSize: 5,
					tickPadding: 10,
					tickRotation: 0,
					tickValues: 5,
					format: (value) => `${value}`
				}}
				enableGridY={false}
				enableGridX={false}
				layers={['grid', 'axes', 'bars', CustomLayer, 'markers', 'annotations']}
				legends={[]}
			/>
		</div>
	);
};
export default TierDistributionChart;
