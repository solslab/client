import Image from 'next/image';
import Link from 'next/link';
import Float from '../ui/interaction/float';
import { Metadata } from 'next';
import { NEXT_PUBLIC_KAKAO_CLIENT_ID, NEXT_URL } from '@/app/lib/utils/constants';

export const metadata: Metadata = {
	title: '로그인 | 몇솔'
};

export default function Page({ searchParams }: { searchParams: { error?: string; message?: string } }) {
	return (
		<div className="relative flex min-h-[calc(100vh-152px-64px)] flex-col items-center justify-center">
			<Float />
			<div className="absolute h-full w-full bg-white bg-opacity-75 backdrop-blur-[7px]">
				<div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<Image
							width={132}
							height={66}
							className="mx-auto"
							src="/icons/logo_login.png"
							alt="Sols"
						/>
					</div>
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<div className="flex items-center justify-center">
							<Link
								href={`https://kauth.kakao.com/oauth/authorize?client_id=${NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${NEXT_URL}/login/callback&response_type=code`}
								className=" "
							>
								<div className="flex rounded-md bg-kakao px-6 py-2 text-sm font-semibold text-black shadow-sm">
									<div className="flex">
										<svg viewBox="0 0 21 20" width="21" height="20" fill="none">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M10.5 2.62891C6.16282 2.62891 2.64282 5.36319 2.64282 8.72605C2.64282 10.8239 4.00211 12.6546 6.07639 13.7703L5.20425 16.9682C5.1878 17.0318 5.19118 17.0989 5.21396 17.1605C5.23673 17.2222 5.27781 17.2754 5.33167 17.313C5.38554 17.3506 5.44962 17.3709 5.51532 17.371C5.58102 17.3712 5.6452 17.3513 5.69925 17.3139L9.51782 14.776C9.83997 14.776 10.17 14.8311 10.5 14.8311C14.8371 14.8311 18.3571 12.0968 18.3571 8.72605C18.3571 5.35534 14.8371 2.62891 10.5 2.62891Z"
												fill="#181600"
											></path>
										</svg>
										<div className="ml-1">카카오 계정으로 계속하기</div>
									</div>
								</div>
							</Link>
						</div>
						{/* 에러 메시지 표시 */}
						{searchParams.error && searchParams.message && (
							<div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
								<p className="text-center text-sm font-medium text-red-600">
									{searchParams.message}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
