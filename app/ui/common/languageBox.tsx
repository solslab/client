import Image from 'next/image';
import { SKILLS_LOGO } from '@/app/lib/utils/constants';

export default function LanguageBox({ language }: { language: string }) {
	return (
		<div key={language} className="mb-2 mr-2 flex rounded-3xl border border-gray-30 px-4 py-1">
			<div className="mr-2 flex flex-col justify-center">
				{SKILLS_LOGO[language]?.logo ? (
					<Image src={SKILLS_LOGO[language]?.logo} alt="language logo" width={24} height={24} />
				) : (
					<></>
				)}
			</div>
			<div className="flex items-center justify-center text-sm text-text-base">{language}</div>
		</div>
	);
}
