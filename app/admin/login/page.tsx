'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginAdmin } from '@/app/lib/data-admin';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';


export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();
	const basePath = useIsAdminDomain() ? '' : '/admin';

	 const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			setError('');

			try {
				const responseData = await loginAdmin(email, password);
				if (responseData.status === 200) {
					const token = responseData.data.accessToken;
					const cookieResponse = await fetch(`${basePath}/api/admin-login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ token })
					});

					if (!cookieResponse.ok) {
						throw new Error('쿠키 설정에 실패했습니다');
					}

					router.push(`${basePath}/manage/member`);
				} else {
					setError(responseData.message || '로그인에 실패했습니다.');
				}
			} catch (err) {
				setError('로그인 처리 중 오류가 발생했습니다.');
				console.error('Login error:', err);
			}
		};

	return (
		<>
			<Head>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<div
				className="flex min-h-screen flex-col items-center justify-center"
				style={{ height: 'calc(100vh - 64px)' }}
			>
				<div className="flex items-center space-x-4 mb-8">
					<Image src="/admin_logo.png" alt="몇솔 로고" width={32} height={32} />
					<h1 className="text-3xl font-semibold">solslab admin</h1>
				</div>

				{/* <h1 className="mb-8 text-center text-3xl font-semibold">solslab admin</h1> */}
				<div className="border-silver w-3/12 rounded-lg rounded-md border bg-white p-12 shadow-lg">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="flex flex-col space-y-2">
							<label htmlFor="email" className="text-lg font-medium">
								ID
							</label>
							<Input
								className="w-full rounded border p-2"
								id="email"
								type="email"
								placeholder="Enter your admin account"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="password" className="text-lg font-medium">
								Password
							</label>
							<Input
								className="w-full rounded border p-2"
								id="password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button className="mt-6 w-full">Login</Button>
					</form>
				</div>

				{error && (
					<AlertDialog defaultOpen>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>로그인 오류</AlertDialogTitle>
								<AlertDialogDescription>{error}</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogAction onClick={() => setError('')}>확인</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div>
		</>
	);
}
