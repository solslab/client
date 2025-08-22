import Image from 'next/image';

export default function VerifyMark() {
	return (
		<div className="hidden items-center rounded-lg bg-main-light px-3 py-2 text-main-base sm:flex">
			<div className="flex items-center justify-center">
				<Image src={'/icons/verifyIcon.png'} width={18} height={18} alt="verifyed" />
			</div>
			<div className="ml-2 flex h-5 items-center justify-center text-sm font-bold">
				<div>기업 제공</div>
			</div>
		</div>
	);
}
