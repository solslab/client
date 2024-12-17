'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginAdmin } from '@/app/lib/data';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { access } from 'fs';

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // 기본 동작 방지
		setError(''); // 기존 에러 초기화

		const responseData = await loginAdmin(email, password);

		if (responseData.status === 200) {
			// 로그인 성공
			const token = responseData.data.accessToken;
			localStorage.setIem('solslab-accessToken', token);
			router.push('/admin');
		} else {
			// 로그인 실패 - 에러 메시지 설정
			setError(responseData.message || '로그인에 실패했습니다.');
		}
	};

	return (
		<div
			className="flex min-h-screen items-center justify-center"
			style={{ height: 'calc(100vh - 64px)' }}
		>
			<div className="w-96 rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-6 text-center text-2xl font-bold">SOLSLAB ADMIN</h1>
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div className="flex flex-col space-y-2">
						<label htmlFor="email" className="text-lg font-medium">
							Email
						</label>
						<Input
							className="w-full rounded border p-2"
							id="email"
							type="email"
							placeholder="Enter your email"
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
					<Button className="mt-6 w-full">OK</Button>
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
							<AlertDialogAction onClick={() => setError('')}>Close</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}
