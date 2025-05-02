'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LanguageBox from '../common/languageBox';
import { tokenTest } from '@/app/lib/server/queries/auth/token';

interface LanguageSectionProps {
	support_languages: string[];
}

function LanguageSkeleton() {
	return (
		<div className="flex w-full flex-wrap gap-2">
			{[1, 2, 3].map((i) => (
				<div key={i} className="h-8 w-20 animate-pulse rounded-md bg-gray-200" />
			))}
		</div>
	);
}

export default function LanguageSection({ support_languages }: LanguageSectionProps) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const result = await tokenTest('USER');
				setIsAuthenticated(result !== null && result !== false);
			} catch (err) {
				setError('인증 확인 중 오류가 발생했습니다.');
				console.error('Auth check error:', err);
			}
		};

		checkAuth();
	}, []);

	if (error) {
		return <div className="text-sm text-red-500">{error}</div>;
	}

	if (isAuthenticated === null) {
		return <LanguageSkeleton />;
	}

	if (isAuthenticated && support_languages.length > 0) {
		return (
			<div className="flex w-full flex-wrap">
				{support_languages.map((language) => (
					<LanguageBox key={language} language={language} />
				))}
			</div>
		);
	}

	return (
		<>
			<div className="mt-4 flex rounded-3xl bg-gray-5 px-6 py-2 md:mt-0">
				<div className="flex items-center">
					<Image src={'/icons/lock.png'} width={24} height={24} alt="time icon" />
				</div>
				<div className="my-auto ml-4 text-sm text-gray-70">회원에게만 공개된 정보입니다.</div>
			</div>
			<Link
				href="/login"
				className="ml:0 mt-4 rounded-md border-2 border-main-base px-6 py-3 font-semibold text-main-base sm:ml-6 sm:mt-0"
			>
				3초만에 가입하기!
			</Link>
		</>
	);
}
