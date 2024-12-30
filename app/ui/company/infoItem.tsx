import Image from 'next/image';

export default async function InfoItem({
	src,
	label,
	data,
	className
}: {
	src: string;
	label: string;
	data: string;
	className?: string; // Optional className property added
}) {
	return (
		<div className={`pb-4 ${className || ''}`}>
			{' '}
			{/* Apply className dynamically */}
			<div className="flex justify-between py-2 text-gray-90">
				<div className="flex">
					<div className="flex flex-col justify-center">
						<Image src={src} width={24} height={24} alt="time icon" />
					</div>
					<div className="my-auto ml-2 text-sm md:text-base">{label}</div>
				</div>
				<div className="my-auto text-base font-medium md:text-lg">{data}</div>
			</div>
		</div>
	);
}
