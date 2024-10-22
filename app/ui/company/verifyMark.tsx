import Image from "next/image";

export default function VerifyMark() {
	return (
		<div className="py-2 px-3 bg-main-light items-center text-main-base rounded-lg ml-4 hidden sm:flex">
            <div className="flex justify-center items-center">
                <Image src={'/icons/verifyIcon.png'} width={18} height={18} alt='verifyed'/>
            </div>
            <div className="text-sm ml-2 font-bold h-5 flex justify-center items-center">
                <div>기업 제공</div>
            </div>
        </div>
	);
}
