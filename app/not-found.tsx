import Image from 'next/image';

function NotFound() {
	return (
		<div className="flex h-[80vh] flex-col items-center justify-center">
			<div className="relative -mb-5 aspect-square w-1/2 max-w-sm md:-mb-10">
				<Image src="/404.png" alt="404" layout="fill" objectFit="contain" priority />
			</div>
			<div className="text-xl font-bold text-gray-800 md:text-3xl">Page Not Found</div>
		</div>
	);
}

export default NotFound;
